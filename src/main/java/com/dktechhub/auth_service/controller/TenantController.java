package com.dktechhub.auth_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dktechhub.auth_service.dto.CreateTenantRequest;
import com.dktechhub.auth_service.dto.TenantResponse;
import com.dktechhub.auth_service.service.TenantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantService tenantService;

    @PostMapping
    public ResponseEntity<TenantResponse> create(@RequestBody CreateTenantRequest request) {
        return ResponseEntity.ok(tenantService.createTenant(request));
    }

    @GetMapping
    public ResponseEntity<List<TenantResponse>> getAll() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenantResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(tenantService.getTenant(id));
    }
}
