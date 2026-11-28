package com.alzhecare.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alzhecare.backend.dto.request.PasswordChangeRequest;
import com.alzhecare.backend.dto.request.PasswordVerificationRequest;
import com.alzhecare.backend.dto.request.ProfileUpdateRequest;
import com.alzhecare.backend.dto.response.AuthResponse;
import com.alzhecare.backend.dto.response.PasswordVerificationResponse;
import com.alzhecare.backend.dto.response.UserResponse;
import com.alzhecare.backend.model.User;
import com.alzhecare.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getProfile(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getProfile(user));
    }

    @PutMapping("/me")
    public ResponseEntity<AuthResponse> updateProfile(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(userService.updateProfile(user, request));
    }

    @PostMapping("/me/verify-password")
    public ResponseEntity<PasswordVerificationResponse> verifyPassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PasswordVerificationRequest request) {
        PasswordVerificationResponse response = userService.verifyPassword(user, request);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PasswordChangeRequest request) {
        userService.changePassword(user, request);

        return ResponseEntity.noContent().build();
    }
}