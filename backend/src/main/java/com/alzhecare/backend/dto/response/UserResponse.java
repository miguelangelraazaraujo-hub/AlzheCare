package com.alzhecare.backend.dto.response;

import com.alzhecare.backend.model.User;
import com.alzhecare.backend.model.UserRole;

public record UserResponse(
    Integer idUsuario,
    String nombre,
    String apellidos,
    String correoElectronico,
    UserRole rol
) {

    public static UserResponse fromEntity(User user) {
        return new UserResponse(
            user.getIdUsuario(),
            user.getNombre(),
            user.getApellidos(),
            user.getCorreoElectronico(),
            user.getRol()
        );
    }
}
