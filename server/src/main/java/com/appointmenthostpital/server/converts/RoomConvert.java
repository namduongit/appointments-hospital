package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.responses.RoomResponse;

public class RoomConvert {
    public static RoomResponse convertToResponse(RoomModel model) {
        return new RoomResponse(
            model.getId(),
            model.getName(),
            model.getStatus(),
            model.getDepartmentModel() != null ? model.getDepartmentModel().getId() : null,
            model.getDepartmentModel() != null ? model.getDepartmentModel().getName() : null
        );
    }

    public static void convertFromCreateRequest(RoomModel roomModel, AdminRoomDTO.CreateRoomRequest request) {
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
    }

    public static void convertFromUpdateRequest(RoomModel roomModel, AdminRoomDTO.UpdateRoomRequest request) {
        roomModel.setName(request.getName());
        roomModel.setStatus(request.getStatus());
    }
}
