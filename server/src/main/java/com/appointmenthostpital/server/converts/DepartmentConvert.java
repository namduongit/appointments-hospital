package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.responses.DepartmentResponse;

public class DepartmentConvert {
    public static DepartmentResponse convertToResponse(DepartmentModel model) {
        return new DepartmentResponse(
            model.getId(),
            model.getName(),
            model.getRoomModels() != null ? model.getRoomModels().stream().map(RoomConvert::convertToResponse).toList() : null,
            model.getDoctorProfileModels() != null ? model.getDoctorProfileModels().stream().map(DoctorConvert::convertToResponse).toList() : null,
            model.getAppointmentModels() != null ? model.getAppointmentModels().stream().map(AppointmentConvert::convertToResponse).toList() : null
        );
    }

    public static void convertFromUpdateRequest(DepartmentModel model, String name) {
        model.setName(name);
    }   
}