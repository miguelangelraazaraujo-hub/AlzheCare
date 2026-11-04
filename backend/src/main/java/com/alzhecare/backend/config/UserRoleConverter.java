package com.alzhecare.backend.config;

import com.alzhecare.backend.model.UserRole;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole role) {
        if (role == null) {
            return null;
        }

        return switch (role) {
            case PATIENT -> "paciente";
            case CAREGIVER -> "cuidador";
        };
    }

    @Override
    public UserRole convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        return switch (value) {
            case "paciente" -> UserRole.PATIENT;
            case "cuidador" -> UserRole.CAREGIVER;
            default -> throw new IllegalArgumentException(
                "Rol no reconocido en la base de datos: " + value
            );
        };
    }
}