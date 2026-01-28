package com.dktechhub.auth_service.dao;

import com.dktechhub.auth_service.model.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {

    boolean existsByTenantIdAndGroupCode(Long tenantId, String groupCode);

    List<UserGroup> findByTenantId(Long tenantId);
}

