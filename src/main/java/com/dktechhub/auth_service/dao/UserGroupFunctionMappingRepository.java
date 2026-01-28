package com.dktechhub.auth_service.dao;

import com.dktechhub.auth_service.model.UserGroupFunctionMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserGroupFunctionMappingRepository
        extends JpaRepository<UserGroupFunctionMapping, Long> {

    List<UserGroupFunctionMapping> findByTenantIdAndGroupId(Long tenantId, Long groupId);
}

