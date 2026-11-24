package com.alzhecare.backend.config;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.alzhecare.backend.model.User;
import com.alzhecare.backend.repository.UserRepository;
import com.alzhecare.backend.service.JwtService;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
        JwtService jwtService,
        UserRepository userRepository
    ) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
            request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null) {
            filterChain.doFilter(request, response);
            return;
        }

        if (!authorizationHeader.startsWith("Bearer ")
            || authorizationHeader.substring(7).isBlank()) {

            sendUnauthorizedResponse(
                response,
                "La autenticación proporcionada no es válida."
            );
            return;
        }

        String token = authorizationHeader.substring(7);

        try {
            String email = jwtService.extractEmail(token);

            User user = userRepository.findByCorreoElectronico(email)
                .orElse(null);

            if (user == null) {
                sendUnauthorizedResponse(
                    response,
                    "La sesión no corresponde a un usuario válido."
                );
                return;
            }

            var authorities = List.of(
                new SimpleGrantedAuthority(
                    "ROLE_" + user.getRol().name()
                )
            );

            var authentication =
                new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    authorities
                );

            SecurityContextHolder.getContext()
                .setAuthentication(authentication);

        } catch (JwtException | IllegalArgumentException exception) {
            SecurityContextHolder.clearContext();

            sendUnauthorizedResponse(
                response,
                "El token de autenticación es inválido o ha caducado."
            );
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void sendUnauthorizedResponse(
        HttpServletResponse response,
        String message
    ) throws IOException {

        SecurityContextHolder.clearContext();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(
            "{\"message\":\"" + message + "\"}"
        );
    }
}