package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.DoctorConvert;
import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.models.UserModel;
import com.appointmenthostpital.server.repositories.DoctorProfileRepository;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.utils.ValidPassword;

@Service
public class DoctorService {
    @Autowired
    private DoctorProfileRepository doctorProfileRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private DepartmentService departmentService;

     @Autowired
    private PasswordEncoder passwordEncoder;

    public DoctorProfileModel getDoctorById(Long id) {
        return this.doctorProfileRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy bác sĩ"));
    }

    public List<DoctorResponse> handleGetDoctorList() {
        List<DoctorProfileModel> models = this.doctorProfileRepository.findAll();
        return models.stream().map(DoctorConvert::convertToResponse).toList();
    }

    public DoctorResponse handleCreateDoctor(AdminDoctorDTO.CreateDoctorRequest request) {
        if (!ValidPassword.comparePassword(request.getPassword(), request.getPasswordConfirm())) {
            throw new PasswordNotValidException("Mật khẩu xác nhận không khớp");
        }

        String encodePassword = this.passwordEncoder.encode(request.getPassword());

        UserModel userModel = new UserModel();
        userModel.setEmail(request.getEmail());
        userModel.setPassword(encodePassword);
        userModel.setRole("DOCTOR");

        DoctorProfileModel doctorProfileModel = new DoctorProfileModel();
        doctorProfileModel.setFullName(request.getFullName());
        doctorProfileModel.setBirthDate(request.getBirthDate());
        doctorProfileModel.setGender(request.getGender());
        doctorProfileModel.setDegree(request.getDegree());
        doctorProfileModel.setPhone(request.getPhone());
        doctorProfileModel.setImage(request.getImage());

        DepartmentModel departmentModel = this.departmentService.getDepartmentById(request.getDepartmentId());
        doctorProfileModel.setDepartmentModel(departmentModel);
        doctorProfileModel.setUserModel(userModel);

        userModel.setDoctorProfileModel(doctorProfileModel);

        userModel = this.userService.save(userModel);
        doctorProfileModel = this.doctorProfileRepository.save(doctorProfileModel);

        return DoctorConvert.convertToResponse(doctorProfileModel);
    }

    public DoctorResponse handleUpdateDoctor(Long id, AdminDoctorDTO.UpdateDoctorRequest request) {
        DoctorProfileModel model = this.getDoctorById(id);
        DoctorConvert.convertFromRequest(model, request);
        model = this.doctorProfileRepository.save(model);
        return DoctorConvert.convertToResponse(model);
    }

    public void handleDeleteDoctor(Long id) {
        DoctorProfileModel model = this.getDoctorById(id);
        UserModel userModel = model.getUserModel();
        this.userService.delete(userModel);
    }
}
