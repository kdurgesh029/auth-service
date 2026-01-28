package com.dktechhub.auth_service.service;

import java.util.List;

import com.dktechhub.auth_service.dto.CreateTenantRequest;
import com.dktechhub.auth_service.dto.TenantResponse;

public interface TenantService {

    TenantResponse createTenant(CreateTenantRequest request);

    List<TenantResponse> getAllTenants();

    TenantResponse getTenant(Long id);
}
