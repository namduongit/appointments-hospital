package com.appointmenthostpital.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserDetailDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * Get all detail
     * 
     * @param authentication
     * @return
     */
    @GetMapping("/me")
    public ResponseEntity<RestResponse<UserDetailDTO>> handleGetAccountDetail(Authentication authentication) {
        UserDetailDTO userDetail = this.userService.handleGetAccountDetail(authentication);
        return ResponseEntity.ok().body(
                new RestResponse<UserDetailDTO>(
                        HttpStatusResponse.OK,
                        true,
                        userDetail,
                        HttpStatusResponse.SUCCESS_MESSAGE,
                        null));
    }

    /**
     * Update user profile
     * 
     * @param authentication
     * @param updateRequest
     * @return
     */
    @PutMapping("/profile")
    public ResponseEntity<RestResponse<UserUpdateDTO.UpdateProfileResponse>> handleUpdateUserProfile(
            Authentication authentication,
            @Valid @RequestBody UserUpdateDTO.UpdateProfileRequest updateRequest) {

        this.userService.validateUpdateRequest(updateRequest);

        UserUpdateDTO.UpdateProfileResponse response = this.userService.handleUpdateUserProfile(authentication,
                updateRequest);

        return ResponseEntity.ok().body(
                new RestResponse<UserUpdateDTO.UpdateProfileResponse>(
                        HttpStatusResponse.OK,
                        true,
                        response,
                        HttpStatusResponse.SUCCESS_MESSAGE,
                        null));
    }

    /**
     * Create new appointment
     * 
     * @param authentication
     * @param createRequest
     * @return
     */
    @PostMapping("/appointments")
    public ResponseEntity<RestResponse<UserAppointmentDTO.CreateAppointmentResponse>> handleCreateAppointment(
            Authentication authentication, 
            @Valid @RequestBody UserAppointmentDTO.CreateAppointmentRequest createRequest) {
        
        UserAppointmentDTO.CreateAppointmentResponse response = this.userService.handleCreateAppointment(authentication, createRequest);
        
        return ResponseEntity.ok().body(
            new RestResponse<UserAppointmentDTO.CreateAppointmentResponse>(
                HttpStatusResponse.CREATED,
                true,
                response,
                "Tạo lịch hẹn thành công",
                null
            )
        );
    }

}
