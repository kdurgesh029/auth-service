package com.dktechhub.auth_service.service;

import com.dktechhub.auth_service.dto.CreateUserGroupRequest;
import com.dktechhub.auth_service.dto.UserGroupResponse;

import java.util.List;
import java.util.Set;

public interface UserGroupService {

    UserGroupResponse createGroup(CreateUserGroupRequest request);

    List<UserGroupResponse> getGroupsByTenant(Long tenantId);

    void addFunctionsToGroup(Long groupId, Set<Long> functionIds);
}
