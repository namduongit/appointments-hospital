package com.appointmenthostpital.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.admin.AdminAccountDTO;
import com.appointmenthostpital.server.responses.AccountResponse;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
        @Autowired
        private UserService userService;

        @GetMapping("")
        public ResponseEntity<RestResponse<List<AccountResponse>>> handleGetAccountList() {
                List<AccountResponse> userModels = this.userService.handleGetAccountList();
                return ResponseEntity.ok().body(new RestResponse<List<AccountResponse>>(HttpStatusResponse.OK, true,
                                userModels, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        @PostMapping("")
        public ResponseEntity<RestResponse<AccountResponse>> handleCreateAccount(
                        @Valid @RequestBody AdminAccountDTO.CreateAccountRequest request) {
                AccountResponse response = this.userService.handleCreateAccount(request);
                return ResponseEntity.ok().body(new RestResponse<AccountResponse>(
                                HttpStatusResponse.CREATED,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<RestResponse<?>> handleDeleteAccount(
                        @PathVariable(name = "id", required = true) Long id) {
                this.userService.deleteById(id);
                return ResponseEntity.ok().body(new RestResponse<>(
                                HttpStatusResponse.OK,
                                true,
                                null,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }

        @PutMapping("/{id}")
        public ResponseEntity<RestResponse<AccountResponse>> handleUpdateAccount(
                        @RequestBody AdminAccountDTO.UpdateAccountRequest request,
                        @Valid @PathVariable(name = "id", required = true) Long id) {
                AccountResponse response = this.userService.handleUpdateAccount(id, request);
                return ResponseEntity.ok().body(new RestResponse<AccountResponse>(
                                HttpStatusResponse.OK,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }
}