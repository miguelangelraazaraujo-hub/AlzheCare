package com.alzhecare.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alzhecare.backend.service.CategoryService;
import com.alzhecare.backend.dto.response.CategoryResponse;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    public List<CategoryResponse> gelAllCategories() {
        return categoryService.getAllCategories();
    }
}
