package com.dktechhub.auth_service.controller;

import com.dktechhub.auth_service.dto.CreateUserRequest;
import com.dktechhub.auth_service.dto.UserResponse;
import com.dktechhub.auth_service.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> create(@RequestBody CreateUserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PostMapping("/{userId}/groups")
    public ResponseEntity<Void> assignGroups(
            @PathVariable Long userId,
            @RequestBody Set<Long> groupIds) {

        userService.assignGroups(userId, groupIds);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}/functions")
    public ResponseEntity<List<String>> getFunctions(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserFunctions(userId));
    }
}

