package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminDoctorDTO;
import com.appointmenthostpital.server.models.DoctorProfileModel;
import com.appointmenthostpital.server.responses.DoctorResponse;

public class DoctorConvert {
    public static DoctorResponse convertToResponse(DoctorProfileModel model) {
        return new DoctorResponse(
            model.getId(), model.getAccountModel().getEmail(), model.getImage(), model.getFullName(), model.getGender(), model.getPhone(),
            model.getBirthDate(), model.getDegree(), model.getWorkDay(), model.getStatus(),
            model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null,
            model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null
        );
    }

    public static void convertFromCreateRequest(DoctorProfileModel model, AdminDoctorDTO.CreateDoctorRequest request) {
        model.setImage(request.getImage());
        model.setFullName(request.getFullName());
        model.setBirthDate(request.getBirthDate());
        model.setGender(request.getGender());
        model.setDegree(request.getDegree());
        model.setPhone(request.getPhone());
    }

    public static void convertFromUpdateRequest(DoctorProfileModel model, AdminDoctorDTO.UpdateDoctorRequest request) {
        model.setImage(request.getImage());
        model.setFullName(request.getFullName());
        model.setBirthDate(request.getBirthDate());
        model.setGender(request.getGender());
        model.setDegree(request.getDegree());
        model.setPhone(request.getPhone());
        model.setStatus(request.getStatus());
    }

    public static void convertFromWorkDayRequest(DoctorProfileModel model, AdminDoctorDTO.UpdateDoctorWorkDayRequest request) {
        model.setWorkDay(request.getWorkDay());
    }
}
