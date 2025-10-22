package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.dtos.admin.AdminMedicineInventoryDTO;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.responses.MedicineResponse;

public class MedicineConvert {
    public static MedicineResponse convertToResponse(MedicineModel model) {
        return new MedicineResponse(
            model.getId(),
            model.getName(),
            model.getDescription(),
            model.getUnit(),
            model.getPrice(),
            model.getCostPrice(),
            model.getManufacturer(),
            model.getStatus(),
            model.getCurrentStock(),
            model.getMinStock(),
            model.getMaxStock(),
            model.getCategoryModel() != null ? model.getCategoryModel().getId() : null,
            model.getCategoryModel() != null ? model.getCategoryModel().getName() : null
        );
    }

    public static void convertFromCreateRequest(MedicineModel model, AdminMedicineInventoryDTO.CreateMedicineRequest request) {
            model.setName(request.getName());
            model.setDescription(request.getDescription());
            model.setUnit(request.getUnit());
            model.setPrice(request.getPrice());
            model.setCostPrice(request.getCostPrice());
            model.setManufacturer(request.getManufacturer());
            model.setStatus(request.getStatus());
            model.setCurrentStock(request.getCurrentStock());
            model.setMinStock(request.getMinStock());
            model.setMaxStock(request.getMaxStock());
    }

    public static void convertFromUpdateRequest(MedicineModel model, AdminMedicineInventoryDTO.UpdateMedicineRequest request) {
            model.setName(request.getName());
            model.setDescription(request.getDescription());
            model.setUnit(request.getUnit());
            model.setPrice(request.getPrice());
            model.setCostPrice(request.getCostPrice());
            model.setManufacturer(request.getManufacturer());
            model.setStatus(request.getStatus());
            model.setMinStock(request.getMinStock());
            model.setMaxStock(request.getMaxStock());
    }
}
