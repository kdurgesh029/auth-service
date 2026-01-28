package com.dktechhub.auth_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "user_groups",
        uniqueConstraints = @UniqueConstraint(columnNames = {"tenant_id", "group_code"}))
@Getter @Setter
public class UserGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_code", nullable = false)
    private String groupCode;

    private String description;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @ManyToMany
    @JoinTable(
            name = "user_groups-app_functions_mapping",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "function_id")
    )
    private Set<AppFunction> functions = new HashSet<>();
}
