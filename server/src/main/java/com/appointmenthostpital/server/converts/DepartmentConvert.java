package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.DepartmentModel;
import com.appointmenthostpital.server.responses.DepartmentResponse;

public class DepartmentConvert {
    public static DepartmentResponse convertToResponse(DepartmentModel model) {
        return new DepartmentResponse(
            model.getId(),
            model.getName(),
            model.getRoomModels().stream().map(RoomConvert::convertToResponse).toList(),
            model.getDoctorProfileModels().stream().map(DoctorConvert::convertToResponse).toList(),
            model.getAppointmentModels().stream().map(AppointmentConvert::convertToResponse).toList()
        );
    }
}