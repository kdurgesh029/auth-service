package com.dktechhub.auth_service.dao;

import com.dktechhub.auth_service.model.AppFunction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppFunctionRepository extends JpaRepository<AppFunction, Long> {

    boolean existsByTenantIdAndCode(Long tenantId, String code);

    List<AppFunction> findByTenantId(Long tenantId);
}

