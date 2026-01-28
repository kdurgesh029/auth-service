package com.dktechhub.auth_service.service.implementations;

import java.util.List;

import com.dktechhub.auth_service.service.interfaces.TenantService;
import org.springframework.stereotype.Service;

import com.dktechhub.auth_service.dao.TenantRepository;
import com.dktechhub.auth_service.dto.CreateTenantRequest;
import com.dktechhub.auth_service.dto.TenantResponse;
import com.dktechhub.auth_service.model.Tenant;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

    private final TenantRepository tenantRepository;

    @Override
    public TenantResponse createTenant(CreateTenantRequest request) {

        if (tenantRepository.existsByName(request.getName())) {
            throw new RuntimeException("Tenant already exists");
        }

        Tenant tenant = new Tenant();
        tenant.setName(request.getName());
        tenant.setDescription(request.getDescription());

        Tenant saved = tenantRepository.save(tenant);

        return new TenantResponse(saved.getId(), saved.getName(), saved.getDescription());
    }

    @Override
    public List<TenantResponse> getAllTenants() {
        return tenantRepository.findAll()
                .stream()
                .map(t -> new TenantResponse(t.getId(), t.getName(), t.getDescription()))
                .toList();
    }

    @Override
    public TenantResponse getTenant(Long id) {
        Tenant t = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        return new TenantResponse(t.getId(), t.getName(), t.getDescription());
    }
}
