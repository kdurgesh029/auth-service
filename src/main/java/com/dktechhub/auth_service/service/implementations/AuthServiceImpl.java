package com.dktechhub.auth_service.service.implementations;

import com.dktechhub.auth_service.dao.UserRepository;
import com.dktechhub.auth_service.dto.LoginRequest;
import com.dktechhub.auth_service.dto.LoginResponse;
import com.dktechhub.auth_service.model.AppFunction;
import com.dktechhub.auth_service.model.User;
import com.dktechhub.auth_service.security.JwtService;
import com.dktechhub.auth_service.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository
                .findByTenantIdAndEmail(request.getTenantId(), request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        List<String> functions = user.getGroups().stream()
                .flatMap(g -> g.getFunctions().stream())
                .map(AppFunction::getCode)
                .distinct()
                .toList();

        String token = jwtService.generateToken(user, functions);

        return new LoginResponse(token);
    }
}

