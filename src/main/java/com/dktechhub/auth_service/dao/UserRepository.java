package com.dktechhub.auth_service.dao;

import com.dktechhub.auth_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByTenantIdAndEmail(Long tenantId, String email);

    Optional<User> findByTenantIdAndEmail(Long tenantId, String email);
}

