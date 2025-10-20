package com.appointmenthostpital.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.dtos.admin.AdminInventoryTransactionDTO;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.InventoryTransactionModel;
import com.appointmenthostpital.server.models.MedicineInventoryModel;
import com.appointmenthostpital.server.repositories.InventoryTransactionRepository;
import com.appointmenthostpital.server.responses.InventoryTransactionResponse;

@Service
public class InventoryTransactionService {

    @Autowired
    private InventoryTransactionRepository inventoryTransactionRepository;

    @Autowired
    private MedicineInventoryService medicineInventoryService;

    public List<InventoryTransactionResponse> handleGetTransactionList() {
        List<InventoryTransactionModel> transactions = inventoryTransactionRepository.findAllOrderByCreatedAtDesc();
        return transactions.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<InventoryTransactionResponse> handleGetTransactionsByMedicineId(Long medicineId) {
        List<InventoryTransactionModel> transactions = inventoryTransactionRepository.findByMedicineId(medicineId);
        return transactions.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<InventoryTransactionResponse> handleGetTransactionsByType(String type) {
        List<InventoryTransactionModel> transactions = inventoryTransactionRepository.findByType(type);
        return transactions.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<InventoryTransactionResponse> handleGetTransactionsByStatus(String status) {
        List<InventoryTransactionModel> transactions = inventoryTransactionRepository.findByStatus(status);
        return transactions.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public InventoryTransactionResponse handleCreateTransaction(AdminInventoryTransactionDTO.CreateTransactionRequest request) {
        // Get medicine
        MedicineInventoryModel medicine = medicineInventoryService.getMedicineById(request.getMedicineId());

        InventoryTransactionModel transaction = new InventoryTransactionModel();
        transaction.setMedicine(medicine);
        transaction.setType(request.getType());
        transaction.setQuantity(request.getQuantity());
        transaction.setUnitPrice(request.getUnitPrice());
        transaction.setTotalAmount(request.getTotalAmount());
        transaction.setReason(request.getReason());
        transaction.setReference(request.getReference());
        transaction.setBatchNumber(request.getBatchNumber());
        transaction.setExpiryDate(request.getExpiryDate());
        transaction.setSupplierName(request.getSupplierName());
        transaction.setCustomerName(request.getCustomerName());
        transaction.setStatus(request.getStatus());
        transaction.setPerformedBy(request.getPerformedBy());

        InventoryTransactionModel savedTransaction = inventoryTransactionRepository.save(transaction);

        // Update medicine stock if transaction is completed
        if ("completed".equals(request.getStatus())) {
            updateMedicineStock(medicine, transaction);
        }

        return convertToResponse(savedTransaction);
    }

    public InventoryTransactionResponse handleUpdateTransaction(Long id, AdminInventoryTransactionDTO.UpdateTransactionRequest request) {
        InventoryTransactionModel transaction = inventoryTransactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy giao dịch với ID: " + id));

        String oldStatus = transaction.getStatus();
        Integer oldQuantity = transaction.getQuantity();
        String oldType = transaction.getType();

        // Update transaction fields
        if (request.getType() != null) {
            transaction.setType(request.getType());
        }
        if (request.getQuantity() != null) {
            transaction.setQuantity(request.getQuantity());
        }
        if (request.getUnitPrice() != null) {
            transaction.setUnitPrice(request.getUnitPrice());
        }
        if (request.getTotalAmount() != null) {
            transaction.setTotalAmount(request.getTotalAmount());
        }
        if (request.getReason() != null) {
            transaction.setReason(request.getReason());
        }
        if (request.getReference() != null) {
            transaction.setReference(request.getReference());
        }
        if (request.getBatchNumber() != null) {
            transaction.setBatchNumber(request.getBatchNumber());
        }
        if (request.getExpiryDate() != null) {
            transaction.setExpiryDate(request.getExpiryDate());
        }
        if (request.getSupplierName() != null) {
            transaction.setSupplierName(request.getSupplierName());
        }
        if (request.getCustomerName() != null) {
            transaction.setCustomerName(request.getCustomerName());
        }
        if (request.getStatus() != null) {
            transaction.setStatus(request.getStatus());
        }

        InventoryTransactionModel updatedTransaction = inventoryTransactionRepository.save(transaction);

        // Handle stock updates based on status changes
        if ("completed".equals(oldStatus) && !"completed".equals(transaction.getStatus())) {
            // Revert stock change
            revertMedicineStock(transaction.getMedicine(), oldQuantity, oldType);
        } else if (!"completed".equals(oldStatus) && "completed".equals(transaction.getStatus())) {
            // Apply stock change
            updateMedicineStock(transaction.getMedicine(), transaction);
        } else if ("completed".equals(oldStatus) && "completed".equals(transaction.getStatus())) {
            // Revert old change and apply new change
            revertMedicineStock(transaction.getMedicine(), oldQuantity, oldType);
            updateMedicineStock(transaction.getMedicine(), transaction);
        }

        return convertToResponse(updatedTransaction);
    }

    public void handleDeleteTransaction(Long id) {
        InventoryTransactionModel transaction = inventoryTransactionRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy giao dịch với ID: " + id));

        // Revert stock if transaction was completed
        if ("completed".equals(transaction.getStatus())) {
            revertMedicineStock(transaction.getMedicine(), transaction.getQuantity(), transaction.getType());
        }

        inventoryTransactionRepository.delete(transaction);
    }

    private void updateMedicineStock(MedicineInventoryModel medicine, InventoryTransactionModel transaction) {
        int currentStock = medicine.getCurrentStock();
        int newStock;

        switch (transaction.getType()) {
            case "import":
                newStock = currentStock + transaction.getQuantity();
                break;
            case "export":
                newStock = currentStock - transaction.getQuantity();
                break;
            case "adjustment":
                newStock = transaction.getQuantity(); // For adjustment, quantity is the new total
                break;
            default:
                return;
        }

        medicineInventoryService.updateMedicineStock(medicine.getId(), Math.max(0, newStock));
    }

    private void revertMedicineStock(MedicineInventoryModel medicine, Integer quantity, String type) {
        int currentStock = medicine.getCurrentStock();
        int newStock;

        switch (type) {
            case "import":
                newStock = currentStock - quantity;
                break;
            case "export":
                newStock = currentStock + quantity;
                break;
            case "adjustment":
                // For adjustment revert, we can't easily revert without knowing the previous stock
                return;
            default:
                return;
        }

        medicineInventoryService.updateMedicineStock(medicine.getId(), Math.max(0, newStock));
    }

    private InventoryTransactionResponse convertToResponse(InventoryTransactionModel transaction) {
        return new InventoryTransactionResponse(
                transaction.getId(),
                transaction.getMedicine().getId(),
                transaction.getMedicine().getName(),
                transaction.getType(),
                transaction.getQuantity(),
                transaction.getUnitPrice(),
                transaction.getTotalAmount(),
                transaction.getReason(),
                transaction.getReference(),
                transaction.getBatchNumber(),
                transaction.getExpiryDate(),
                transaction.getSupplierName(),
                transaction.getCustomerName(),
                transaction.getStatus(),
                transaction.getPerformedBy(),
                transaction.getCreatedAt(),
                transaction.getUpdatedAt()
        );
    }
}
