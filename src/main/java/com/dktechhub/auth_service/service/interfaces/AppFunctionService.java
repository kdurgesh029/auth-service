package com.dktechhub.auth_service.service.interfaces;

import com.dktechhub.auth_service.dto.CreateFunctionRequest;
import com.dktechhub.auth_service.dto.FunctionResponse;

import java.util.List;

public interface AppFunctionService {

    FunctionResponse createFunction(CreateFunctionRequest request);

    List<FunctionResponse> getFunctionsByTenant(Long tenantId);
}
