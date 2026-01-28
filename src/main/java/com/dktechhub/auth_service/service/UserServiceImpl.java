package com.dktechhub.auth_service.service;

import com.dktechhub.auth_service.dao.TenantRepository;
import com.dktechhub.auth_service.dao.UserGroupRepository;
import com.dktechhub.auth_service.dao.UserRepository;
import com.dktechhub.auth_service.dto.CreateUserRequest;
import com.dktechhub.auth_service.dto.UserResponse;
import com.dktechhub.auth_service.model.AppFunction;
import com.dktechhub.auth_service.model.Tenant;
import com.dktechhub.auth_service.model.User;
import com.dktechhub.auth_service.model.UserGroup;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final UserGroupRepository groupRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(CreateUserRequest request) {

        if (userRepository.existsByTenantIdAndEmail(request.getTenantId(), request.getEmail())) {
            throw new RuntimeException("User already exists");
        }

        Tenant tenant = tenantRepository.findById(request.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setTenant(tenant);
        user.setStatus("ACTIVE");

        User saved = userRepository.save(user);

        return new UserResponse(saved.getId(), saved.getEmail(), saved.getStatus());
    }

    @Override
    public void assignGroups(Long userId, Set<Long> groupIds) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<UserGroup> groups = new HashSet<>(groupRepository.findAllById(groupIds));

        user.getGroups().addAll(groups);
        userRepository.save(user);
    }

    @Override
    public List<String> getUserFunctions(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getGroups().stream()
                .flatMap(g -> g.getFunctions().stream())
                .map(AppFunction::getCode)
                .distinct()
                .toList();
    }
}

