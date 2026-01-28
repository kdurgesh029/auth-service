package com.dktechhub.auth_service.service.interfaces;

import com.dktechhub.auth_service.dto.CreateUserRequest;
import com.dktechhub.auth_service.dto.UserResponse;

import java.util.List;
import java.util.Set;

public interface UserService {

    UserResponse createUser(CreateUserRequest request);

    void assignGroups(Long userId, Set<Long> groupIds);

    List<String> getUserFunctions(Long userId);
}
