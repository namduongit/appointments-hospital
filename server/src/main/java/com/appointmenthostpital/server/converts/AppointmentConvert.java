package com.appointmenthostpital.server.converts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.responses.AppointmentResponse;
import com.appointmenthostpital.server.services.DepartmentService;
import com.appointmenthostpital.server.services.RoomService;
import com.appointmenthostpital.server.services.UserService;

@Service
public class AppointmentConvert {
    @Autowired
    private static UserService userService;

    @Autowired
    private static DepartmentService departmentService;

    @Autowired
    private static RoomService roomService;

    public static AppointmentResponse convertToResponse(AppointmentModel model) {
        return new AppointmentResponse(
            model.getId(),
            model.getFullName(),
            model.getPhone(),
            model.getTime(),
            model.getNote(),
            model.getStatus(),
            model.getCreatedAt().toString(),

            model.getUserModel() != null ? model.getUserModel().getEmail() : null,

            model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null,
            model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null,

            model.getDoctorModel() != null ? model.getDoctorModel().getId() : null,
            model.getDoctorModel() != null ? model.getDoctorModel().getUserProfileModel().getFullName() : null,

            model.getRoomModel() != null ? model.getRoomModel().getId() : null,
            model.getRoomModel() != null ? model.getRoomModel().getName() : null
        );
    } 

    public static void convertFromUpdateRequest(AdminAppointmentDTO.UpdateAppointmentRequest request, AppointmentModel model) {
        if (request.getPhone() != null) {
            model.setPhone(request.getPhone());
        }
        if (request.getTime() != null) {
            model.setTime(request.getTime());
        }
        if (request.getNote() != null) {
            model.setNote(request.getNote());
        }
        if (request.getStatus() != null) {
            model.setStatus(request.getStatus());
        }
        if (request.getDepartmentId() != null) {
            model.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));
        }
        if (request.getDoctorId() != null) {
            model.setDoctorModel(userService.getUserById(request.getDoctorId()));
        }
        if (request.getRoomId() != null) {
            model.setRoomModel(roomService.getRoomById(request.getRoomId()));
        }
    }
}
