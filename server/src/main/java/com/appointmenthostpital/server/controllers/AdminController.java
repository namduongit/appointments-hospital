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
import com.appointmenthostpital.server.dtos.admin.AccountDTO;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.services.UserService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
        @Autowired
        private UserService userService;

        /**
         * Get accounts list
         * 
         * @param null
         * @return
         */
        @GetMapping("/accounts")
        public ResponseEntity<RestResponse<List<UserModel>>> handleGetAccountList() {
                List<UserModel> userModels = this.userService.handleGetAccountList();
                userModels.forEach(userModel -> userModel.setPassword(null));
                return ResponseEntity.ok().body(new RestResponse<List<UserModel>>(HttpStatusResponse.OK, true,
                                userModels, HttpStatusResponse.SUCCESS_MESSAGE, null));
        }

        /**
         * Create new account
         * 
         * @param createAccountRequest
         * @return
         */
        @PostMapping("/accounts")
        public ResponseEntity<RestResponse<AccountDTO.CreateAccountResponse>> handleCreateAccount(
                        @Valid @RequestBody AccountDTO.CreateAccountRequest createAccountRequest) {
                AccountDTO.CreateAccountResponse response = this.userService.handleCreateAccount(createAccountRequest);
                return ResponseEntity.ok().body(new RestResponse<AccountDTO.CreateAccountResponse>(
                                HttpStatusResponse.CREATED,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }

        /**
         * Delete account
         * 
         * @param deleteAccountRequest
         * @return
         */
        @DeleteMapping("/accounts/{id}")
        public ResponseEntity<RestResponse<AccountDTO.DeleteAccountResponse>> handleDeleteAccount(@PathVariable(required = true) Long id) {
                AccountDTO.DeleteAccountResponse response = this.userService
                                .handleDeleteAccount(id);
                return ResponseEntity.ok().body(new RestResponse<AccountDTO.DeleteAccountResponse>(
                                HttpStatusResponse.OK,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }

        /**
         * Update account
         * 
         * @param accountRequest
         * @param id
         * @return
         */
        @PutMapping("/accounts/{id}")
        public ResponseEntity<RestResponse<AccountDTO.UpdateAccountResponse>> handleUpdateAccount(
                        @RequestBody AccountDTO.UpdateAccountRequest accountRequest, @PathVariable(required = true) Long id) {
                AccountDTO.UpdateAccountResponse response = this.userService.handleUpdateAccount(accountRequest, id);
                return ResponseEntity.ok().body(new RestResponse<AccountDTO.UpdateAccountResponse>(
                                HttpStatusResponse.OK,
                                true,
                                response,
                                HttpStatusResponse.SUCCESS_MESSAGE,
                                null));
        }
}