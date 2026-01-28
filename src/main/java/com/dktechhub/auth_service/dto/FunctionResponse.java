package com.dktechhub.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FunctionResponse {
    private Long id;
    private String code;
    private String description;
}
