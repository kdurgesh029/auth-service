package com.dktechhub.auth_service.dto;

import lombok.Data;

@Data
public class CreateFunctionRequest {
    private Long tenantId;
    private String code;
    private String description;
}
