package com.alzhecare.backend.dto.request;

import com.alzhecare.backend.model.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    String nombre,

    @NotBlank(message = "Los apellidos son obligatorios")
    @Size(max = 150, message = "Los apellidos no pueden superar los 150 caracteres")
    String apellidos,

    @NotBlank(message = "El correo electrónico es obligatorio")
    @Email(message = "El correo electrónico no tiene un formato válido")
    @Size(max = 150, message = "El correo electrónico no puede superar los 150 caracteres")
    String correoElectronico,

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 8, max = 72, message = "La contraseña debe tener entre 8 y 72 caracteres")
    String contrasena,

    @NotNull(message = "El rol es obligatorio")
    UserRole rol

) {
}
