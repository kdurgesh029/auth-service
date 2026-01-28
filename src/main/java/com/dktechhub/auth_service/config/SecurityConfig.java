package com.dktechhub.auth_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())   // Disable CSRF for APIs
                .authorizeHttpRequests(auth -> auth
                        //.requestMatchers("/public/**").permitAll()  // allow these
                       // .anyRequest().authenticated()               // rest secured
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults()); // or remove if using JWT

        return http.build();
    }
}
