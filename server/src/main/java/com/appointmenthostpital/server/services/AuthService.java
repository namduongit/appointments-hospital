package com.appointmenthostpital.server.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.LoginDTO;
import com.appointmenthostpital.server.dtos.RegisterDTO;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.utils.BCryptPassword;

import com.appointmenthostpital.server.utils.DateCustom;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPassword bCryptPassword;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    public RegisterDTO.RegisterResponse handlerRegister(RegisterDTO.RegisterRequest registerRequest) {
        UserModel userModel = new UserModel();
        UserProfileModel profileModel = new UserProfileModel();

        userModel.setEmail(registerRequest.getEmail());
        userModel.setPassword(this.bCryptPassword.passwordEncoder().encode(registerRequest.getPassword()));
        userModel.setRole("USER");
        userModel.setStatus("ACTIVE");
        userModel.setUserProfileModel(profileModel);

        profileModel.setUserModel(userModel);

        UserModel model = this.userRepository.save(userModel);

        return new RegisterDTO.RegisterResponse(model.getId(), model.getEmail(), model.getRole(), model.getType(),
                DateCustom.getCurrentTimeStamp());
    }

    public LoginDTO.LoginRepsonse handleLogin(LoginDTO.LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        if (!authentication.isAuthenticated()) {
            throw new UsernameNotFoundException("Invalid email or password");
        }

        // Generate token
        String accessToken = this.jwtService.generateToken(authentication);

        // getName was used when login
        String email = authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        // Extract issuedAt + expiresAt from JWTService
        Instant now = Instant.now();
        Instant expires = now.plus(jwtService.getExpireSecond(), ChronoUnit.SECONDS);

        int issuedAt = (int) now.getEpochSecond();
        int expiresAt = (int) expires.getEpochSecond();

        return new LoginDTO.LoginRepsonse(
                accessToken,
                email,
                role,
                issuedAt,
                expiresAt);
    }
}
