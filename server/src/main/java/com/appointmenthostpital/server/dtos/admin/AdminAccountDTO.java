package com.appointmenthostpital.server.dtos.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class AdminAccountDTO {
    public static class CreateAccountRequest {
        @NotNull(message = "Không được để trống email")
        @NotBlank(message = "Không được để trống email")
        @Pattern(regexp = "^[A-Za-z].{5,}@gmail\\.com$", message = "Email không đúng định dạng")
        private String email;
        @NotNull(message = "Không được để trống email")
        @NotBlank(message = "Không được để trống mật khẩu")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String password;
        @NotNull(message = "Không được để trống email")
        @NotBlank(message = "Không được để trống mật khẩu xác nhận")
        @Size(min = 8, message = "Mật khẩu phải có ít nhất 8 kí tự")
        private String passwordConfirm;
        @NotNull(message = "Không được để trống email")
        @NotBlank(message = "Quyền tài khoản không được để trống")
        @Pattern(regexp = "USER|ASSISTOR|DOCTOR|ADMIN", message = "Quyền tài khoản không đúng")
        private String role;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getPasswordConfirm() {
            return passwordConfirm;
        }

        public void setPasswordConfirm(String passwordConfirm) {
            this.passwordConfirm = passwordConfirm;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }

    public static class UpdateAccountRequest {
        @NotBlank(message = "Không được để trống mật khẩu")
        private String password;
        @NotBlank(message = "Quyền tài khoản không được để trống")
        private String role;
        @NotBlank(message = "Trạng thái tài khoản không được để trống")
        private String status;

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getStatus() {
            return status;
        }
        
        public void setStatus(String status) {
            this.status = status;
        }
    }
}
