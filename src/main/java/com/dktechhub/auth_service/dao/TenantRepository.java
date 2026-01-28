package com.dktechhub.auth_service.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dktechhub.auth_service.model.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {

    boolean existsByName(String name);
}
