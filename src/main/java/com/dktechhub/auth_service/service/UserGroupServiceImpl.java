package com.dktechhub.auth_service.service;

import com.dktechhub.auth_service.dao.AppFunctionRepository;
import com.dktechhub.auth_service.dao.TenantRepository;
import com.dktechhub.auth_service.dao.UserGroupRepository;
import com.dktechhub.auth_service.dto.CreateUserGroupRequest;
import com.dktechhub.auth_service.dto.UserGroupResponse;
import com.dktechhub.auth_service.model.AppFunction;
import com.dktechhub.auth_service.model.Tenant;
import com.dktechhub.auth_service.model.UserGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserGroupServiceImpl implements UserGroupService {

    private final UserGroupRepository groupRepository;
    private final AppFunctionRepository functionRepository;
    private final TenantRepository tenantRepository;

    @Override
    public UserGroupResponse createGroup(CreateUserGroupRequest request) {

        if (groupRepository.existsByTenantIdAndGroupCode(request.getTenantId(), request.getGroupCode())) {
            throw new RuntimeException("Group already exists");
        }

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        UserGroup group = new UserGroup();
        group.setGroupCode(request.getGroupCode());
        group.setDescription(request.getDescription());
        group.setTenant(tenant);

        UserGroup saved = groupRepository.save(group);

        return new UserGroupResponse(saved.getId(), saved.getGroupCode(), saved.getDescription());
    }

    @Override
    public List<UserGroupResponse> getGroupsByTenant(Long tenantId) {
        return groupRepository.findByTenantId(tenantId)
                .stream()
                .map(g -> new UserGroupResponse(g.getId(), g.getGroupCode(), g.getDescription()))
                .toList();
    }

    @Override
    public void addFunctionsToGroup(Long groupId, Set<Long> functionIds) {

        UserGroup group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Set<AppFunction> functions = new HashSet<>(functionRepository.findAllById(functionIds));

        group.getFunctions().addAll(functions);

        groupRepository.save(group);
    }
}

