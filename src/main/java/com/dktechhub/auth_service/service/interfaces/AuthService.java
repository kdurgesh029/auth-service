package com.dktechhub.auth_service.service.interfaces;

import com.dktechhub.auth_service.dto.LoginRequest;
import com.dktechhub.auth_service.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
