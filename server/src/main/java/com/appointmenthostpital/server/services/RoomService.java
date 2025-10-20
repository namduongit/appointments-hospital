package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.RoomConvert;
import com.appointmenthostpital.server.dtos.admin.AdminRoomDTO;
import com.appointmenthostpital.server.models.RoomModel;
import com.appointmenthostpital.server.repositories.RoomRepository;
import com.appointmenthostpital.server.responses.RoomResponse;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private DepartmentService departmentService;

    public RoomModel getRoomById(Long id) {
        return this.roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));
    }

    public List<RoomResponse> handleGetRoomList() {
        List <RoomModel> models = this.roomRepository.findAll();
        return models.stream().map(RoomConvert::convertToResponse).toList();
    }

    public RoomResponse handleCreateRoom(AdminRoomDTO.CreateRoomRequest request) {
        RoomModel model = new RoomModel();
        model.setName(request.getName());
        model.setStatus(request.getStatus());

        model.setDepartmentModel(this.departmentService.getDepartmentById(request.getDepartmentId()));
        model = this.roomRepository.save(model);

        return RoomConvert.convertToResponse(model);
    }

    public RoomResponse handleUpdateRoom(Long id, AdminRoomDTO.UpdateRoomRequest request) {
        RoomModel model = this.getRoomById(id);
        RoomConvert.convertFromUpdateRequest(request, model);
        model = this.roomRepository.save(model);
        return RoomConvert.convertToResponse(model);
    }

    public void handleDeleteRoom(Long id) {
        RoomModel model = this.getRoomById(id);
        this.roomRepository.delete(model);
    }
}
