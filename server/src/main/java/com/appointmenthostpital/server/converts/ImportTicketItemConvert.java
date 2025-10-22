package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.ImportTicketItemModel;
import com.appointmenthostpital.server.responses.ImportTicketItemResponse;

public class ImportTicketItemConvert {
    public static ImportTicketItemResponse convertToResponse(ImportTicketItemModel model) {
        ImportTicketItemResponse response = new ImportTicketItemResponse(
            model.getId(),
            model.getMedicine().getId(),
            model.getMedicine().getName(),
            model.getQuantity(),
            model.getUnitPrice(),
            model.getExpiryDate()
        );
        return response;
    }
}
