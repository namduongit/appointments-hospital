package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.MedicineInventoryModel;
import com.appointmenthostpital.server.responses.MedicineInventoryResponse;

public class MedicineInventoryConvert {
    public static MedicineInventoryResponse convertToResponse(MedicineInventoryModel model) {
        return new MedicineInventoryResponse(
            model.getId(),
            model.getName(),
            model.getDescription(),
            model.getUnit(),
            model.getPrice(),
            model.getCostPrice(),
            model.getBarcode(),
            model.getManufacturer(),
            model.getExpiryDate(),
            model.getStatus(),
            model.getCurrentStock(),
            model.getMinStock(),
            model.getMaxStock(),
            model.getCreatedAt(),
            model.getCategoryModel() != null ? model.getCategoryModel().getId() : null,
            model.getCategoryModel() != null ? model.getCategoryModel().getName() : null
        );
    }
}
