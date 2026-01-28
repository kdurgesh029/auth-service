package com.dktechhub.auth_service.dao;

import com.dktechhub.auth_service.model.UserUserGroupMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserUserGroupMappingRepository
        extends JpaRepository<UserUserGroupMapping, Long> {

    List<UserUserGroupMapping> findByTenantIdAndUserId(Long tenantId, Long userId);
}

