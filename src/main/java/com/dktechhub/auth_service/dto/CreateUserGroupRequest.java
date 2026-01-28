package com.dktechhub.auth_service.dto;

import lombok.Data;

@Data
public class CreateUserGroupRequest {
    private Long tenantId;
    private String groupCode;
    private String description;
}
