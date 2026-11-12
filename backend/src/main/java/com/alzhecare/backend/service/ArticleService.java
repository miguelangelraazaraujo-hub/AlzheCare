package com.alzhecare.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alzhecare.backend.dto.response.ArticleResponse;
import com.alzhecare.backend.dto.response.CategoryResponse;
import com.alzhecare.backend.model.Article;
import com.alzhecare.backend.repository.ArticleRepository;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<ArticleResponse> searchArticles(String search, Integer categoryId) {

        if (search != null) {
            search = search.trim();

            if (search.isEmpty()) {
                search = null;
            }
        }

        List<Article> articles = articleRepository.searchArticles(search, categoryId);

        return articles.stream()
                .map(article -> new ArticleResponse(
                        article.getIdArticulo(),
                        article.getTitulo(),
                        article.getContenido(),
                        article.getImagen(),
                        article.getFuente(),
                        article.getFechaPublicacion(),
                        article.getFechaActualizacion(),
                        article.getArticleCategories().stream()
                                .map(relation -> new CategoryResponse(
                                        relation.getCategory().getIdCategoria(),
                                        relation.getCategory().getNombre(),
                                        relation.getCategory().getDescripcion()
                                ))
                                .toList()
                ))
                .toList();
    }
}
