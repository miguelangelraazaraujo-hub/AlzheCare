package com.alzhecare.backend.service;

import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alzhecare.backend.dto.request.ProfileUpdateRequest;
import com.alzhecare.backend.dto.response.UserResponse;
import com.alzhecare.backend.exception.DuplicateEmailException;
import com.alzhecare.backend.model.User;
import com.alzhecare.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserResponse getProfile(User user) {
        return UserResponse.fromEntity(user);
    }

    @Transactional
    public UserResponse updateProfile(User user, ProfileUpdateRequest request) {

        String correo = normalizeEmail(request.correoElectronico());

        if (!correo.equals(normalizeEmail(user.getCorreoElectronico()))
                && userRepository.existsByCorreoElectronico(correo)) {
            throw new DuplicateEmailException();
        }

        user.setNombre(request.nombre().trim());
        user.setApellidos(request.apellidos().trim());
        user.setCorreoElectronico(correo);

        User updatedUser = userRepository.save(user);

        return UserResponse.fromEntity(updatedUser);
    }

    private String normalizeEmail(String correo) {
        return correo.trim().toLowerCase(Locale.ROOT);
    }
}