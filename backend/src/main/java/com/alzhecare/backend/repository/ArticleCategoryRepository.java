package com.alzhecare.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alzhecare.backend.model.ArticleCategory;

@Repository
public interface ArticleCategoryRepository extends JpaRepository<ArticleCategory, Integer> {
}