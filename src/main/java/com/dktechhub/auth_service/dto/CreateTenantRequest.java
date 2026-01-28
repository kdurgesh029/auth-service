package com.dktechhub.auth_service.dto;

import lombok.Data;

@Data
public class CreateTenantRequest {
    private String name;
    private String description;
}

