package com.dktechhub.auth_service.security;

import com.dktechhub.auth_service.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import java.util.Date;
import java.util.List;

@Service
public class JwtService {

    private final String SECRET = "989809805898098989098983325845734854589893589358";

    public String generateToken(User user, List<String> functions) {

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("tenantId", user.getTenant().getId())
                .claim("authorities", functions)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
