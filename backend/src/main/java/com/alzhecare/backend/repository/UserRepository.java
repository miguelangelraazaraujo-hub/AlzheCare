package com.alzhecare.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alzhecare.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByCorreoElectronico(String correoElectronico);

    boolean existsByCorreoElectronico(String correoElectronico);
}