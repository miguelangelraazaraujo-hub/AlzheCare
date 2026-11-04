package com.alzhecare.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alzhecare.backend.dto.request.LoginRequest;
import com.alzhecare.backend.dto.request.RegisterRequest;
import com.alzhecare.backend.dto.response.UserResponse;
import com.alzhecare.backend.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
        @Valid @RequestBody RegisterRequest request
    ) {
        UserResponse response = authService.register(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(
        @Valid @RequestBody LoginRequest request
    ) {
        UserResponse response = authService.authenticate(request);

        return ResponseEntity.ok(response);
    }
}
