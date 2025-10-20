package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminMedicalPackageDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;

import com.appointmenthostpital.server.models.MedicalPackageModel;

import com.appointmenthostpital.server.repositories.MedicalPackageRepository;

import com.appointmenthostpital.server.responses.MedicalPackageResponse;

@Service
public class MedicalPackageService {
    @Autowired
    private MedicalPackageRepository medicalPackageRepository;

    public MedicalPackageModel getMedicalPackageModel(Long id) {
        return this.medicalPackageRepository.findById(id).orElseThrow(() -> new NotFoundResourceException("Không tìm thấy gói dịch vụ y tế"));
    }

    public List<MedicalPackageResponse> handleGetMedicalPackageList() {
        List<MedicalPackageModel> medicalPackageModels = this.medicalPackageRepository.findAll();
        return medicalPackageModels.stream().map(medicalPackageModel -> {
            MedicalPackageResponse response = new MedicalPackageResponse();
            response.setId(medicalPackageModel.getId());
            response.setName(medicalPackageModel.getName());
            response.setDescription(medicalPackageModel.getDescription());
            response.setStatus(medicalPackageModel.getStatus());
            response.setPrice(medicalPackageModel.getPrice());
            return response;
        }).toList();
    }

    public MedicalPackageResponse handleCreateMedicalPackage(AdminMedicalPackageDTO.CreateMedicalPackageRequest request) {
        MedicalPackageModel medicalPackageModel = new MedicalPackageModel();
        medicalPackageModel.setName(request.getName());
        medicalPackageModel.setDescription(request.getDescription());
        medicalPackageModel.setStatus(request.getStatus());
        medicalPackageModel.setPrice(request.getPrice());

        MedicalPackageModel savedMedicalPackageModel = this.medicalPackageRepository.save(medicalPackageModel);

        MedicalPackageResponse response = new MedicalPackageResponse();
        response.setId(savedMedicalPackageModel.getId());
        response.setName(savedMedicalPackageModel.getName());
        response.setDescription(savedMedicalPackageModel.getDescription());
        response.setStatus(savedMedicalPackageModel.getStatus());
        response.setPrice(savedMedicalPackageModel.getPrice());
        return response;
    }

    public MedicalPackageResponse handleUpdateMedicalPackage(Long id, AdminMedicalPackageDTO.UpdateMedicalPackageRequest request) {
        MedicalPackageModel medicalPackageModel = this.getMedicalPackageModel(id);
        if (request.getName() != null)
            medicalPackageModel.setName(request.getName());
        if (request.getDescription() != null)
            medicalPackageModel.setDescription(request.getDescription());
        if (request.getStatus() != null)
            medicalPackageModel.setStatus(request.getStatus());
        if (request.getPrice() != null)
            medicalPackageModel.setPrice(request.getPrice());

        MedicalPackageModel updatedMedicalPackageModel = this.medicalPackageRepository.save(medicalPackageModel);

        MedicalPackageResponse response = new MedicalPackageResponse();
        response.setId(updatedMedicalPackageModel.getId());
        response.setName(updatedMedicalPackageModel.getName());
        response.setDescription(updatedMedicalPackageModel.getDescription());
        response.setStatus(updatedMedicalPackageModel.getStatus());
        response.setPrice(updatedMedicalPackageModel.getPrice());
        return response;
    }


}
