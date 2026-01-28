package com.dktechhub.auth_service.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private Long tenantId;
    private String email;
    private String password;
}

