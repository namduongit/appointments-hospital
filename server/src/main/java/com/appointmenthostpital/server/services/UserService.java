package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminAccountDTO;
import com.appointmenthostpital.server.dtos.user.UserUpdateDTO;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.models.UserProfileModel;
import com.appointmenthostpital.server.repositories.UserRepository;
import com.appointmenthostpital.server.responses.AccountResponse;
import com.appointmenthostpital.server.responses.DetailResponse;
import com.appointmenthostpital.server.repositories.UserProfileRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserModel getUserById(Long id) {
        return this.userRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy tài khoản"));
    }

    public UserModel getUserByEmail(String email) {
        UserModel userModel = this.userRepository.findByEmail(email);
        if (userModel == null) {
            throw new NotFoundResourceException("Không tìm thấy tài khoản");
        }
        return userModel;
    }

    public UserModel save(UserModel userModel) {
        return this.userRepository.save(userModel);
    }

    public void delete(UserModel userModel) {
        this.userRepository.delete(userModel);
    }

    public void deleteById(Long id) {
        UserModel userModel = this.getUserById(id);
        this.userRepository.delete(userModel);
    }

    public List<AccountResponse> handleGetAccountList() {
        List<UserModel> userModels = this.userRepository.findAll();
        return userModels.stream().map(userModel -> {
            AccountResponse response = new AccountResponse();
            response.setId(userModel.getId());
            response.setEmail(userModel.getEmail());
            response.setRole(userModel.getRole());
            response.setType(userModel.getType());
            response.setStatus(userModel.getStatus());
            return response;
        }).toList();
    }

    public AccountResponse handleCreateAccount(AdminAccountDTO.CreateAccountRequest request) {
        if (!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu và mật khẩu xác nhận không khớp");
        }

        if (this.userRepository.findByEmail(request.getEmail()) != null) {
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        UserModel userModel = new UserModel();

        userModel.setEmail(request.getEmail());
        userModel.setPassword(passwordEncoder.encode(request.getPassword()));
        userModel.setRole(request.getRole());
        userModel.setType("ACCOUNT");
        userModel.setStatus("ACTIVE");

        if (request.getRole().equals("DOCTOR")) {
            DoctorProfileModel profileModel = new DoctorProfileModel();
            userModel.setDoctorProfileModel(profileModel);
            profileModel.setUserModel(userModel);
        } else {
            UserProfileModel profileModel = new UserProfileModel();
            userModel.setUserProfileModel(profileModel);
            profileModel.setUserModel(userModel);
        }

        UserModel savedUser = this.userRepository.save(userModel);

        AccountResponse response = new AccountResponse();
        response.setId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());
        response.setType(savedUser.getType());
        response.setStatus(savedUser.getStatus());
        return response;
    }

    public AccountResponse handleUpdateAccount(Long id, AdminAccountDTO.UpdateAccountRequest request) {
        UserModel userModel = this.getUserById(id);

        if (request.getPassword() != null) {
            userModel.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRole() != null) {
            userModel.setRole(request.getRole());
            if (request.getRole().equals("DOCTOR")) {
                if (userModel.getDoctorProfileModel() == null) {
                    DoctorProfileModel profileModel = new DoctorProfileModel();
                    userModel.setDoctorProfileModel(profileModel);
                    profileModel.setUserModel(userModel);
                }
                userModel.setUserProfileModel(null);
            } else {
                if (userModel.getUserProfileModel() == null) {
                    UserProfileModel profileModel = new UserProfileModel();
                    userModel.setUserProfileModel(profileModel);
                    profileModel.setUserModel(userModel);
                }
                userModel.setDoctorProfileModel(null);
            }
        }
        if (request.getStatus() != null) {
            userModel.setStatus(request.getStatus());
        }

        UserModel savedUser = this.userRepository.save(userModel);
        AccountResponse response = new AccountResponse();
        response.setId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());
        response.setType(savedUser.getType());
        response.setStatus(savedUser.getStatus());
        return response;
    }

    /** Services is used in _UserController */
    public AccountResponse handleGetAccountDetail(Authentication authentication) {
        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);
        UserProfileModel userProfileModel = userModel.getUserProfileModel();
        List<AppointmentModel> appointmentModels = userModel.getUserAppointments();

        AccountResponse response = new AccountResponse();

        response.setId(userModel.getId());
        response.setEmail(userModel.getEmail());
        response.setRole(userModel.getRole());
        response.setType(userModel.getType());
        response.setStatus(userModel.getStatus());
        if (userProfileModel != null) {
            DetailResponse.ProfileDetail detail = new DetailResponse.ProfileDetail();
            detail.setFullName(userProfileModel.getFullName());
            detail.setPhone(userProfileModel.getPhone());
            detail.setAddress(userProfileModel.getAddress());
            detail.setBirthDate(userProfileModel.getBirthDate());
            response.setProfileDetail(detail);
        }
        if (appointmentModels != null) {
            List<DetailResponse.AppointmentDetail> appointmentDetails = appointmentModels.stream()
                    .map(appointmentModel -> {
                        DetailResponse.AppointmentDetail detail = new DetailResponse.AppointmentDetail();
                        detail.setFullName(appointmentModel.getFullName());
                        detail.setPhone(appointmentModel.getPhone());
                        detail.setTime(appointmentModel.getTime());
                        detail.setNote(appointmentModel.getNote());
                        detail.setStatus(appointmentModel.getStatus());
                        detail.setCreatedAt(appointmentModel.getCreatedAt().toString());
                        return detail;
                    }).toList();
            response.setAppointmentDetails(appointmentDetails);
        }

        return response;
    }

    public AccountResponse handleUpdateProfile(Authentication authentication,
            UserUpdateDTO.UpdateProfileRequest request) {

        String email = authentication.getName();
        UserModel userModel = this.getUserByEmail(email);

        UserProfileModel userProfile = userModel.getUserProfileModel();
        if (userProfile == null) {
            userProfile = new UserProfileModel();
            userProfile.setUserModel(userModel);
            userModel.setUserProfileModel(userProfile);
        }

        userProfile.setFullName(request.getFullName());
        userProfile.setPhone(request.getPhone());
        userProfile.setAddress(request.getAddress());
        userProfile.setBirthDate(request.getBirthDate());

        UserProfileModel savedProfile = this.userProfileRepository.save(userProfile);
        DetailResponse.ProfileDetail detail = new DetailResponse.ProfileDetail();
        detail.setFullName(savedProfile.getFullName());
        detail.setPhone(savedProfile.getPhone());
        detail.setAddress(savedProfile.getAddress());
        detail.setBirthDate(savedProfile.getBirthDate());

        AccountResponse response = new AccountResponse();
        response.setId(savedProfile.getId());
        response.setEmail(userModel.getEmail());
        response.setRole(userModel.getRole());
        response.setType(userModel.getType());
        response.setStatus(userModel.getStatus());
        response.setProfileDetail(detail);
        return response;
    }
}
