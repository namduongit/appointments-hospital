package com.appointmenthostpital.server.converts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.responses.RoomResponse;
import com.appointmenthostpital.server.services.DepartmentService;

@Service
public class RoomConvert {
    @Autowired
    private static DepartmentService departmentService;
    public static RoomResponse convertToResponse(RoomModel model) {
        return new RoomResponse(
            model.getId(),
            model.getName(),
            model.getStatus(),
            model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null,
            model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null
        );
    }

    public static void convertFromUpdateRequest(AdminRoomDTO.UpdateRoomRequest request, RoomModel roomModel) {
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
        roomModel.setDepartmentModel(departmentService.getDepartmentById(request.getDepartmentId()));
    }
}
