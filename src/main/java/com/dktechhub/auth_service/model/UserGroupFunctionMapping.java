package com.dktechhub.auth_service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usergroup_function_mapping")
@Data
public class UserGroupFunctionMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenantId;

    private Long groupId;

    private Long functionId;
}
