package com.appointmenthostpital.server.converts;

import com.appointmenthostpital.server.models.ExportTicketItemModel;
import com.appointmenthostpital.server.responses.ExportTicketItemResponse;

public class ExportTicketItemConvert {
    public static ExportTicketItemResponse convertToResponse(ExportTicketItemModel model) {
        ExportTicketItemResponse response = new ExportTicketItemResponse(
            model.getId(),
            model.getMedicine().getId(),
            model.getMedicine().getName(),
            model.getQuantity()
        );
        return response;
    }
}

