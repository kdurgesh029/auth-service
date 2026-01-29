package com.dktechhub.auth_service.service.interfaces;

import java.util.List;

import com.dktechhub.auth_service.dto.CreateTenantRequest;
import com.dktechhub.auth_service.dto.TenantResponse;

public interface TenantService {

    TenantResponse createTenant(CreateTenantRequest request);

    List<TenantResponse> getAllTenants();

    TenantResponse getTenant(Long id);

    TenantResponse updateTenant(Long id, CreateTenantRequest request);

    void deleteTenant(Long id);
}
