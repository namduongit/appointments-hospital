package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AccountDTO;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserDetailDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.repositories.AppointmentRepository;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.repositories.UserProfileRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AccountDTO.CreateAccountResponse handleCreateAccount(AccountDTO.CreateAccountRequest createRequest) {
        if (!createRequest.getPassword().equals(createRequest.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu và mật khẩu xác nhận không khớp");
        }

        if (this.userRepository.findByEmail(createRequest.getEmail()) != null) {
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        UserModel newUser = new UserModel();
        newUser.setEmail(createRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(createRequest.getPassword()));
        newUser.setRole(createRequest.getRole());
        newUser.setType("ACCOUNT");
        newUser.setStatus("ACTIVE");

        if (createRequest.getRole().equals("DOCTOR")) {
            DoctorProfileModel profileModel = new DoctorProfileModel();
            newUser.setDoctorProfileModel(profileModel);
            profileModel.setUserModel(newUser);
        } else {
            UserProfileModel profileModel = new UserProfileModel();
            newUser.setUserProfileModel(profileModel);
            profileModel.setUserModel(newUser);
        }

        UserModel savedUser = this.userRepository.save(newUser);

        return new AccountDTO.CreateAccountResponse(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getType(),
                java.time.LocalDateTime.now().toString());
    }

    public UserModel getUserByEmail(String username) {
        return this.userRepository.findByEmail(username);
    }

    public List<UserModel> handleGetAccountList() {
        return this.userRepository.findAll();
    }

    public UserDetailDTO handleGetAccountDetail(Authentication authentication) {
        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);
        return new UserDetailDTO(userModel.getId(), userModel.getEmail(), userModel.getRole(), userModel.getType(),
                userModel.getStatus(), userModel.getUserProfileModel(), userModel.getUserAppointmets());
    }

    public UserUpdateDTO.UpdateProfileResponse handleUpdateUserProfile(Authentication authentication,
            UserUpdateDTO.UpdateProfileRequest updateRequest) {

        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);

        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }

        UserProfileModel userProfile = userModel.getUserProfileModel();
        if (userProfile == null) {
            userProfile = new UserProfileModel();
            userProfile.setUserModel(userModel);
            userModel.setUserProfileModel(userProfile);
        }

        userProfile.setFullName(updateRequest.getFullName());
        userProfile.setPhone(updateRequest.getPhone());
        userProfile.setAddress(updateRequest.getAddress());
        userProfile.setBirthDate(updateRequest.getBirthDate());

        UserProfileModel savedProfile = this.userProfileRepository.save(userProfile);

        return new UserUpdateDTO.UpdateProfileResponse(
                savedProfile.getId(),
                savedProfile.getFullName(),
                savedProfile.getPhone(),
                savedProfile.getAddress(),
                savedProfile.getBirthDate(),
                "Cập nhật thông tin thành công");
    }

    public void validateUpdateRequest(UserUpdateDTO.UpdateProfileRequest updateRequest) {
        if (updateRequest.getFullName() == null || updateRequest.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Họ và tên không được để trống");
        }

        if (updateRequest.getPhone() == null || updateRequest.getPhone().trim().isEmpty()) {
            throw new RuntimeException("Số điện thoại không được để trống");
        }

        String phone = updateRequest.getPhone().replaceAll("\\s", "");
        if (!phone.matches("^[0-9]{10,11}$")) {
            throw new RuntimeException("Số điện thoại không hợp lệ");
        }

        if (updateRequest.getBirthDate() == null || updateRequest.getBirthDate().trim().isEmpty()) {
            throw new RuntimeException("Ngày sinh không được để trống");
        }

        if (!updateRequest.getBirthDate().matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            throw new RuntimeException("Ngày sinh phải có định dạng yyyy-MM-dd");
        }
    }

    public AccountDTO.DeleteAccountResponse handleDeleteAccount(Long id) {
        UserModel userModel = this.userRepository.findById(id).orElse(null);
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        this.userRepository.deleteById(id);
        return new AccountDTO.DeleteAccountResponse(userModel.getId(), userModel.getEmail(), userModel.getRole(),
                userModel.getType());
    }

    public AccountDTO.UpdateAccountResponse handleUpdateAccount(AccountDTO.UpdateAccountRequest accountRequest, Long id) {
        UserModel userModel = this.userRepository.findById(id).orElse(null);
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        // Set password and status and role
        userModel.setPassword(accountRequest.getPassword() != null ? this.passwordEncoder.encode(accountRequest.getPassword()) : userModel.getPassword());
        userModel.setRole(accountRequest.getRole() != null ? accountRequest.getRole() : userModel.getRole());
        userModel.setStatus(accountRequest.getStatus() != null ? accountRequest.getStatus() : userModel.getStatus());

        UserModel newUserModel = this.userRepository.save(userModel);
        AccountDTO.UpdateAccountResponse updateAccountResponse = new AccountDTO.UpdateAccountResponse(
            newUserModel.getId(), newUserModel.getEmail(), newUserModel.getRole(), newUserModel.getType(), newUserModel.getStatus()
        );
        return updateAccountResponse;
    }

    /**
     * Create new appointment
     * 
     * @param authentication
     * @param createRequest
     * @return
     */
    public UserAppointmentDTO.CreateAppointmentResponse handleCreateAppointment(
            Authentication authentication,
            UserAppointmentDTO.CreateAppointmentRequest createRequest) {
        
        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);
        
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        
        AppointmentModel appointment = new AppointmentModel();
        appointment.setFullName(createRequest.getFullName());
        appointment.setPhone(createRequest.getPhone());
        appointment.setTime("Ngày: "+ createRequest.getDate() + ", Giờ: " + createRequest.getTime());
        appointment.setNote(createRequest.getNote());
        appointment.setUserModel(userModel);
        
        AppointmentModel savedAppointment = this.appointmentRepository.save(appointment);
        
        return new UserAppointmentDTO.CreateAppointmentResponse(
            savedAppointment.getFullName(),
            savedAppointment.getPhone(),
            savedAppointment.getTime(),
            savedAppointment.getNote(),
            savedAppointment.getStatus()
        );
    }
}
