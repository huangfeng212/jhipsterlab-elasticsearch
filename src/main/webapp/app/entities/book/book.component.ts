import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IBook } from 'app/shared/model/book.model';
import { BookService } from './book.service';

@Component({
  selector: 'jhi-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit, OnDestroy {
  books: IBook[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(protected bookService: BookService, protected eventManager: JhiEventManager, protected activatedRoute: ActivatedRoute) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.bookService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IBook[]>) => (this.books = res.body));
      return;
    }
    this.bookService.query().subscribe((res: HttpResponse<IBook[]>) => {
      this.books = res.body;
      this.currentSearch = '';
    });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBooks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBook) {
    return item.id;
  }

  registerChangeInBooks() {
    this.eventSubscriber = this.eventManager.subscribe('bookListModification', () => this.loadAll());
  }
}
