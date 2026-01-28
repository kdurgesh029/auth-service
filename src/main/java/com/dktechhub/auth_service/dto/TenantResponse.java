package com.dktechhub.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TenantResponse {
    private Long id;
    private String name;
    private String description;
}
