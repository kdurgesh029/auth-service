package com.dktechhub.auth_service.controller;

import com.dktechhub.auth_service.dto.CreateFunctionRequest;
import com.dktechhub.auth_service.dto.FunctionResponse;
import com.dktechhub.auth_service.service.AppFunctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/functions")
@RequiredArgsConstructor
public class AppFunctionController {

    private final AppFunctionService functionService;

    @PostMapping
    public ResponseEntity<FunctionResponse> create(@RequestBody CreateFunctionRequest request) {
        return ResponseEntity.ok(functionService.createFunction(request));
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<FunctionResponse>> getByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(functionService.getFunctionsByTenant(tenantId));
    }
}

