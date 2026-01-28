package com.dktechhub.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserGroupResponse {
    private Long id;
    private String groupCode;
    private String description;
}

