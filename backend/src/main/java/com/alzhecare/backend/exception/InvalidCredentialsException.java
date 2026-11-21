package com.alzhecare.backend.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Correo electrónico o contraseña incorrectos");
    }
}