package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.AppointmentConvert;
import com.appointmenthostpital.server.dtos.admin.AdminAppointmentDTO;
import com.appointmenthostpital.server.exceptions.NotAllowedException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.AppointmentModel;
import com.appointmenthostpital.server.repositories.AppointmentRepository;
import com.appointmenthostpital.server.responses.AppointmentResponse;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public AppointmentModel getAppointmentById(Long id) {
        return this.appointmentRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy lịch hẹn"));
    }

    public AppointmentResponse handleCreateAppointment(AppointmentModel appointment) {
        return AppointmentConvert.convertToResponse(this.appointmentRepository.save(appointment));
    }

    public List<AppointmentResponse> handleGetAppointmentList() {
        List<AppointmentModel> models = this.appointmentRepository.findAll();
        return models.stream().map(AppointmentConvert::convertToResponse).toList();
    }

    public AppointmentResponse handleUpdateAppointment(Long id, AdminAppointmentDTO.UpdateAppointmentRequest request) {
        AppointmentModel model = this.getAppointmentById(id);
        if (model.getStatus().equals("COMPLETED") || model.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể cập nhật lịch hẹn đã hoàn thành hoặc đã hủy");
        }
        AppointmentConvert.convertFromUpdateRequest(request, model);
        return AppointmentConvert.convertToResponse(model);
    }

    public void handleDeleteAppointment(Long id) {
        AppointmentModel model = this.getAppointmentById(id);
        if (model.getStatus().equals("COMPLETED") || model.getStatus().equals("CANCELLED")) {
            throw new NotAllowedException("Không thể xóa lịch hẹn đã hoàn thành hoặc đã hủy");
        }
        this.appointmentRepository.delete(model);
    }
}
