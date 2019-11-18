package com.mycompany.myapp.repository.search;
import com.mycompany.myapp.domain.Book;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Book} entity.
 */
public interface BookSearchRepository extends ElasticsearchRepository<Book, Long> {
}

