package com.alzhecare.backend.dto.response;

public record PasswordVerificationResponse(
    boolean verified,
    String message
) {}