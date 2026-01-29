package com.dktechhub.auth_service.config;

import com.dktechhub.auth_service.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http    .cors(cors -> {})
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/tenants").hasAuthority("SYSTEM_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/tenants/**").hasAuthority("SYSTEM_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/tenants/**").hasAuthority("SYSTEM_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/groups").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/groups/**").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/groups/**").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/functions").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/functions/**").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/functions/**").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/users").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").hasAuthority("TENANT_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAuthority("TENANT_ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
