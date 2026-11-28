package com.alzhecare.backend.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alzhecare.backend.dto.request.PasswordChangeRequest;
import com.alzhecare.backend.dto.request.PasswordVerificationRequest;
import com.alzhecare.backend.dto.request.ProfileUpdateRequest;
import com.alzhecare.backend.dto.response.AuthResponse;
import com.alzhecare.backend.dto.response.PasswordVerificationResponse;
import com.alzhecare.backend.dto.response.UserResponse;
import com.alzhecare.backend.exception.DuplicateEmailException;
import com.alzhecare.backend.exception.InvalidCredentialsException;
import com.alzhecare.backend.model.User;
import com.alzhecare.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public UserService(
        UserRepository userRepository,
        JwtService jwtService,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public UserResponse getProfile(User user) {
        return UserResponse.fromEntity(user);
    }

    @Transactional
    public AuthResponse updateProfile(
        User user,
        ProfileUpdateRequest request
    ) {
        String correo = normalizeEmail(request.correoElectronico());

        if (!correo.equals(normalizeEmail(user.getCorreoElectronico()))
            && userRepository.existsByCorreoElectronico(correo)) {
            throw new DuplicateEmailException();
        }

        user.setNombre(request.nombre().trim());
        user.setApellidos(request.apellidos().trim());
        user.setCorreoElectronico(correo);

        User updatedUser = userRepository.save(user);

        String newToken = jwtService.generateToken(
            updatedUser.getCorreoElectronico()
        );

        return new AuthResponse(
            newToken,
            "Bearer",
            UserResponse.fromEntity(updatedUser)
        );
    }

    @Transactional(readOnly = true)
    public PasswordVerificationResponse verifyPassword(
            User user,
            PasswordVerificationRequest request) {
        boolean verified = passwordEncoder.matches(
                request.contrasenaActual(),
                user.getContrasenaHash());

        if (!verified) {
            return new PasswordVerificationResponse(
                    false,
                    "La contraseña actual es incorrecta.");
        }

        return new PasswordVerificationResponse(
                true,
                "Contraseña verificada correctamente.");
    }

    @Transactional
    public void changePassword(
            User user,
            PasswordChangeRequest request) {
        if (!passwordEncoder.matches(
                request.contrasenaActual(),
                user.getContrasenaHash())) {
            throw new InvalidCredentialsException();
        }

        String newPasswordHash = passwordEncoder.encode(
                request.nuevaContrasena());

        user.setContrasenaHash(newPasswordHash);

        userRepository.save(user);
    }

    private String normalizeEmail(String correo) {
        return correo.trim().toLowerCase(Locale.ROOT);
    }
}