package com.alzhecare.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.alzhecare.backend.dto.response.CategoryResponse;
import com.alzhecare.backend.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "nombre"))
                .stream()
                .map(category -> new CategoryResponse(
                        category.getIdCategoria(),
                        category.getNombre(),
                        category.getDescripcion()
                ))
                .toList();
    }
}
