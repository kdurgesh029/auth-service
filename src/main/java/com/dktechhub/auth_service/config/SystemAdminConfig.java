package com.dktechhub.auth_service.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "system.admin")
@Data
public class SystemAdminConfig {
    private String email;
    private String password;
    private String authority;
}
