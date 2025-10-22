package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.dtos.user.UserAppointmentDTO;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.responses.AppointmentResponse;

public class AppointmentConvert {
    public static AppointmentResponse convertToResponse(AppointmentModel model) {
        return new AppointmentResponse(
            model.getId(),
            model.getFullName(),
            model.getPhone(),
            model.getTime(),
            model.getNote(),
            model.getStatus(),
            model.getCreatedAt().toString(),

            model.getAccountModel() != null ? model.getAccountModel().getEmail() : null,

            model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null,
            model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null,

            model.getDoctorModel() != null ? model.getDoctorModel().getId() : null,
            model.getDoctorModel() != null ? model.getDoctorModel().getDoctorProfileModel().getFullName() : null,

            model.getRoomModel() != null ? model.getRoomModel().getId() : null,
            model.getRoomModel() != null ? model.getRoomModel().getName() : null
        );
    } 

    public static void convertFromUpdateRequest(AppointmentModel model, AdminAppointmentDTO.UpdateAppointmentRequest request) {
        model.setPhone(request.getPhone());
        model.setTime(request.getTime());
        model.setNote(request.getNote());
        model.setStatus(request.getStatus());
    }

    public static void convertFromCreateByUserRequest(AppointmentModel model, UserAppointmentDTO.CreateAppointmentRequest request) {
        model.setFullName(request.getFullName());
        model.setPhone(request.getPhone());
        model.setTime("Ngày: " + request.getDate() + ", Giờ: " + request.getTime());
        model.setNote(request.getNote());
    }
}
