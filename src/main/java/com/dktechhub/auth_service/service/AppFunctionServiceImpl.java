package com.dktechhub.auth_service.service;

import com.dktechhub.auth_service.dao.AppFunctionRepository;
import com.dktechhub.auth_service.dao.TenantRepository;
import com.dktechhub.auth_service.dto.CreateFunctionRequest;
import com.dktechhub.auth_service.dto.FunctionResponse;
import com.dktechhub.auth_service.model.AppFunction;
import com.dktechhub.auth_service.model.Tenant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppFunctionServiceImpl implements AppFunctionService {

    private final AppFunctionRepository functionRepository;
    private final TenantRepository tenantRepository;

    @Override
    public FunctionResponse createFunction(CreateFunctionRequest request) {

        if (functionRepository.existsByTenantIdAndCode(request.getTenantId(), request.getCode())) {
            throw new RuntimeException("Function already exists for tenant");
        }

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        AppFunction function = new AppFunction();
        function.setCode(request.getCode());
        function.setDescription(request.getDescription());
        function.setTenant(tenant);

        AppFunction saved = functionRepository.save(function);

        return new FunctionResponse(saved.getId(), saved.getCode(), saved.getDescription());
    }

    @Override
    public List<FunctionResponse> getFunctionsByTenant(Long tenantId) {

        return functionRepository.findByTenantId(tenantId)
                .stream()
                .map(f -> new FunctionResponse(f.getId(), f.getCode(), f.getDescription()))
                .toList();
    }
}

