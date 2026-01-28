package com.dktechhub.auth_service.controller;

import com.dktechhub.auth_service.dto.CreateUserGroupRequest;
import com.dktechhub.auth_service.dto.UserGroupResponse;
import com.dktechhub.auth_service.service.UserGroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class UserGroupController {

    private final UserGroupService groupService;

    @PostMapping
    public ResponseEntity<UserGroupResponse> create(@RequestBody CreateUserGroupRequest request) {
        return ResponseEntity.ok(groupService.createGroup(request));
    }

    @GetMapping("/tenant/{tenantId}")
    public ResponseEntity<List<UserGroupResponse>> getByTenant(@PathVariable Long tenantId) {
        return ResponseEntity.ok(groupService.getGroupsByTenant(tenantId));
    }

    @PostMapping("/{groupId}/functions")
    public ResponseEntity<Void> addFunctions(
            @PathVariable Long groupId,
            @RequestBody Set<Long> functionIds) {

        groupService.addFunctionsToGroup(groupId, functionIds);
        return ResponseEntity.ok().build();
    }
}

