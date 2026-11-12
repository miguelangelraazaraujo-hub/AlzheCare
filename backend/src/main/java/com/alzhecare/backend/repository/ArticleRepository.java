package com.alzhecare.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.alzhecare.backend.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query("""
            SELECT DISTINCT a
            FROM Article a
            LEFT JOIN FETCH a.articleCategories ac
            LEFT JOIN FETCH ac.category
            WHERE (
                :search IS NULL
                OR LOWER(a.titulo) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(a.contenido) LIKE LOWER(CONCAT('%', :search, '%'))
            )
            AND (
                :categoryId IS NULL
                OR EXISTS (
                    SELECT ac2
                    FROM ArticleCategory ac2
                    WHERE ac2.article = a
                    AND ac2.category.idCategoria = :categoryId
                )
            )
            ORDER BY a.fechaPublicacion DESC
            """)
    List<Article> searchArticles(
            @Param("search") String search,
            @Param("categoryId") Integer categoryId);
}