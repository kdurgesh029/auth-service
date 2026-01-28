package com.dktechhub.auth_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "app_functions",
        uniqueConstraints = @UniqueConstraint(columnNames = {"tenant_id", "code"}))
@Getter @Setter
public class AppFunction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    private String description;

    @ManyToOne
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;
}
