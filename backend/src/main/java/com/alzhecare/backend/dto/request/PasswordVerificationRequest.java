package com.alzhecare.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record PasswordVerificationRequest(

    @NotBlank(message = "La contraseña actual es obligatoria")
    String contrasenaActual

) {}