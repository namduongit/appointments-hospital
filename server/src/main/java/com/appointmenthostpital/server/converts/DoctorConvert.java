package com.appointmenthostpital.server.converts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.responses.DoctorResponse;
import com.appointmenthostpital.server.services.DepartmentService;

@Service
public class DoctorConvert {
    @Autowired
    private static DepartmentService departmentService;

    public static DoctorResponse convertToResponse(DoctorProfileModel model) {
        return new DoctorResponse(
            model.getId(),
            model.getUserModel().getEmail(),
            model.getImage(),
            model.getFullName(),
            model.getGender(),
            model.getPhone(),
            model.getBirthDate(),
            model.getDegree(),
            model.getWorkDay(),
            model.getStatus(),
            model.getDepartmentModel().getId(),
            departmentService.getDepartmentById(model.getDepartmentModel().getId()).getName()
        );
    }

    public static void convertFromRequest(DoctorProfileModel model, AdminDoctorDTO.UpdateDoctorRequest request) {
        if (request.getImage() != null) {
            model.setImage(request.getImage());
        }
        if (request.getFullName() != null) {
            model.setFullName(request.getFullName());
        }
        if (request.getBirthDate() != null) {
            model.setBirthDate(request.getBirthDate());
        }
        if (request.getGender() != null) {
            model.setGender(request.getGender());
        }
        if (request.getDegree() != null) {
            model.setDegree(request.getDegree());
        }
        if (request.getPhone() != null) {
            model.setPhone(request.getPhone());
        }
        if (request.getWorkDay() != null) {
            model.setWorkDay(request.getWorkDay());
        }
        if (request.getStatus() != null) {
            model.setStatus(request.getStatus());
        }
        if (request.getDepartmentId() != null) {
            model.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));
        }
    }
}
