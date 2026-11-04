package com.alzhecare.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo electrónico no tiene un formato válido")
    String correoElectronico,

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(max = 72, message = "La contraseña no es válida")
    String contrasena

) {
}