package com.dktechhub.auth_service.service;

import com.dktechhub.auth_service.dao.*;
import com.dktechhub.auth_service.model.*;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BootstrapService {
    private final TenantRepository tenantRepository;
    private final AppFunctionRepository functionRepository;
    private final UserGroupRepository userGroupRepository;
    private final UserGroupFunctionMappingRepository userGroupFunctionRepository;
    private final UserRepository userRepository;
    private final UserUserGroupMappingRepository userUserGroupRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public void bootstrapTenantAdmin(Long tenantId, String tenantName) {
        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));


        AppFunction adminFunction = new AppFunction();
        adminFunction.setTenant(tenant);
        adminFunction.setCode("TENANT_ADMIN");
        adminFunction.setDescription("Full tenant access");
        functionRepository.save(adminFunction);

        UserGroup adminGroup = new UserGroup();
        adminGroup.setTenant(tenant);
        adminGroup.setGroupCode("TENANT_ADMIN_GROUP");
        adminGroup.setDescription("Default tenant admin group");
        userGroupRepository.save(adminGroup);

        UserGroupFunctionMapping ugf = new UserGroupFunctionMapping();
        ugf.setTenantId(tenantId);
        ugf.setGroupId(adminGroup.getId());
        ugf.setFunctionId(adminFunction.getId());
        userGroupFunctionRepository.save(ugf);

        User adminUser = new User();
        adminUser.setTenant(tenant);
        adminUser.setEmail("admin@" + tenantName.toLowerCase() + ".com");
        adminUser.setPassword(passwordEncoder.encode("ChangeMe123"));
        userRepository.save(adminUser);

        UserUserGroupMapping uug = new UserUserGroupMapping();
        uug.setTenantId(tenantId);
        uug.setUserId(adminUser.getId());
        uug.setGroupId(adminGroup.getId());
        userUserGroupRepository.save(uug);
    }
}

