package com.appointmenthostpital.server.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import com.nimbusds.jose.util.Base64;

@Service
@Configuration
public class JWTService {
    private static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    @Value("${SECRECT_KEY}")
    private String SECRECT_KEY;

    @Value("${EXPIRE_SECOND}")
    private int EXPIRE_SECOND;

    public int getExpireSecond() {
        return this.EXPIRE_SECOND;
    }

    public SecretKey getSecretKey() {
        // decode base64 -> key bytes
        byte[] keyBytes = Base64.from(SECRECT_KEY).decode();
        return new SecretKeySpec(keyBytes, JWT_ALGORITHM.getName());
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(this.getSecretKey()));
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return org.springframework.security.oauth2.jwt.NimbusJwtDecoder.withSecretKey(this.getSecretKey())
                .macAlgorithm(JWT_ALGORITHM)
                .build();
    }

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.EXPIRE_SECOND, ChronoUnit.SECONDS);

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName()) // username/email
                .claim("scope", authorities) // custom claim
                .build();

        return this.jwtEncoder().encode(
                JwtEncoderParameters.from(
                        JwsHeader.with(JWT_ALGORITHM).build(),
                        claimsSet))
                .getTokenValue();
    }
}
