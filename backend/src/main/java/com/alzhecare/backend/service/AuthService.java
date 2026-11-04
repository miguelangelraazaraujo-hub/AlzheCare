package com.alzhecare.backend.service;

import java.nio.charset.StandardCharsets;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alzhecare.backend.dto.request.LoginRequest;
import com.alzhecare.backend.dto.request.RegisterRequest;
import com.alzhecare.backend.dto.response.UserResponse;
import com.alzhecare.backend.model.User;
import com.alzhecare.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {

        String correo = normalizeEmail(request.correoElectronico());

        if (userRepository.existsByCorreoElectronico(correo)) {
            throw new IllegalArgumentException(
                "Ya existe una cuenta con ese correo electrónico"
            );
        }

        if (request.contrasena().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new IllegalArgumentException(
                "La contraseña no puede superar los 72 bytes"
            );
        }

        User user = new User();

        user.setNombre(request.nombre().trim());
        user.setApellidos(request.apellidos().trim());
        user.setCorreoElectronico(correo);
        user.setContrasenaHash(
            passwordEncoder.encode(request.contrasena())
        );
        user.setRol(request.rol());

        User savedUser = userRepository.save(user);

        return UserResponse.fromEntity(savedUser);
    }

    @Transactional(readOnly = true)
    public UserResponse authenticate(LoginRequest request) {

        String correo = normalizeEmail(request.correoElectronico());

        User user = userRepository.findByCorreoElectronico(correo)
            .orElseThrow(() -> new IllegalArgumentException(
                "Correo electrónico o contraseña incorrectos"
            ));

        if (request.contrasena().getBytes(StandardCharsets.UTF_8).length > 72
            || !passwordEncoder.matches(
                request.contrasena(),
                user.getContrasenaHash()
            )) {
            throw new IllegalArgumentException(
                "Correo electrónico o contraseña incorrectos"
            );
        }

        return UserResponse.fromEntity(user);
    }

    private String normalizeEmail(String correo) {
        return correo.trim().toLowerCase(Locale.ROOT);
    }
}