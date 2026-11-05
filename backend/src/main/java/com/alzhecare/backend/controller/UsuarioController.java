package com.alzhecare.backend.controller;

import com.alzhecare.backend.model.User;
import com.alzhecare.backend.model.UserRole;
import com.alzhecare.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioController {
    private final UserRepository repositorio;

    public UsuarioController(UserRepository repositorio) {
        this.repositorio = repositorio;
    }

    public User createUser(String nombre, String apellido, String correo, String contrasena, UserRole rol) {
        return repositorio.save(new User(nombre, apellido, correo, contrasena, rol));
    }

    public User getUser(Integer id) {
        return repositorio.findById(id).orElse(null);
    }

    public User updateUser(Integer id, String newName) {
        User user = getUser(id);
        if(user==null) {
            return null;
        }
        user.setNombre(newName);
        return repositorio.save(user);
    }

    public boolean deleteUser(Integer id){
        if(!repositorio.existsById(id)) {
            return false;
        }
        repositorio.deleteById(id);
        return true;
    }
}
