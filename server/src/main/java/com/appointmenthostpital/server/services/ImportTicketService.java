package com.appointmenthostpital.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.appointmenthostpital.server.converts.ImportTicketConvert;
import com.appointmenthostpital.server.dtos.admin.AdminImportTicketDTO;
import com.appointmenthostpital.server.models.AccountModel;
import com.appointmenthostpital.server.models.ImportTicketItemModel;
import com.appointmenthostpital.server.models.ImportTicketModel;
import com.appointmenthostpital.server.models.MedicineModel;
import com.appointmenthostpital.server.repositories.ImportTicketRepository;
import com.appointmenthostpital.server.responses.ImportTicketResponse;

@Service
public class ImportTicketService {
    @Autowired
    private ImportTicketRepository importTicketRepository;
    
    @Autowired
    private MedicineService medicineService;

    @Autowired 
    private UserService userService;

    public ImportTicketModel getImportTicketById(Long id) {
        return this.importTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phiếu nhập không tồn tại"));
    }

    public List<ImportTicketResponse> handleGetImportTicketList() {
        List<ImportTicketModel> tickets = this.importTicketRepository.findAll();
        return tickets.stream().map(ImportTicketConvert::convertToResponse).toList();
    }

    public ImportTicketResponse handleCreateImportTicket(Authentication authentication ,AdminImportTicketDTO.CreateImportTicketRequest request) {
        ImportTicketModel ticket = new ImportTicketModel();
        AccountModel accountModel = this.userService.getUserByEmail(authentication.getName());
        ticket.setPerformedBy(accountModel);
        ImportTicketConvert.convertFromCreateRequest(ticket, request);
        
        List<ImportTicketItemModel> items = request.getItems().stream().map(itemRequest -> {
            ImportTicketItemModel item = new ImportTicketItemModel();
            MedicineModel medicine = medicineService.getMedicineById(itemRequest.getMedicineId());
            item.setMedicine(medicine);
            item.setQuantity(itemRequest.getQuantity());
            item.setUnitPrice(itemRequest.getUnitPrice());
            item.setExpiryDate(itemRequest.getExpiryDate());
            item.setImportTicket(ticket);
            return item;
        }).toList();
        
        ticket.setItems(items);
        ImportTicketModel savedTicket = this.importTicketRepository.save(ticket);
        return ImportTicketConvert.convertToResponse(savedTicket);
    }

    @Transactional
    public ImportTicketResponse handleChangeImportTicketStatus(Long id,
            AdminImportTicketDTO.ChangeImportTicketStatusRequest request) {
        ImportTicketModel ticket = this.getImportTicketById(id);
        if (ticket.getStatus().equals("COMPLETED") || ticket.getStatus().equals("CANCELLED")) {
            throw new RuntimeException("Không thể thay đổi trạng thái của phiếu nhập đã hoàn thành hoặc hủy");
        }

        String oldStatus = ticket.getStatus();
        String newStatus = request.getStatus();
        
        ticket.setStatus(newStatus);
        ticket = this.importTicketRepository.save(ticket);
        
        if ("COMPLETED".equals(newStatus) && !"COMPLETED".equals(oldStatus)) {
            updateInventoryFromImportTicket(ticket);
        }
        
        return ImportTicketConvert.convertToResponse(ticket);
    }
    
    private void updateInventoryFromImportTicket(ImportTicketModel ticket) {
        if (ticket.getItems() == null || ticket.getItems().isEmpty()) {
            return;
        }
        
        for (ImportTicketItemModel item : ticket.getItems()) {
            try {
                medicineService.updateMedicineStock(item.getMedicine().getId(), item.getQuantity());
            } catch (Exception e) {
                System.err.println("Lỗi khi cập nhật tồn kho cho thuốc ID " + 
                    item.getMedicine().getId() + ": " + e.getMessage());
            }
        }
    }
}
