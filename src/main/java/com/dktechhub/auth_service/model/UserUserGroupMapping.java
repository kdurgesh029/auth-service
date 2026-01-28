package com.dktechhub.auth_service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_usergroup_mapping")
@Data
public class UserUserGroupMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tenantId;

    private Long userId;

    private Long groupId;
}
