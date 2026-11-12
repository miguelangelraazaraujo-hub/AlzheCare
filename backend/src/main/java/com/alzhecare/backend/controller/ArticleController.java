package com.alzhecare.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alzhecare.backend.dto.response.ArticleResponse;
import com.alzhecare.backend.service.ArticleService;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleResponse> searchArticles(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer categoryId) {
        return articleService.searchArticles(search, categoryId);
    }

}
