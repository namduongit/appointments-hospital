package com.appointmenthostpital.server.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.converts.MedicineInventoryConvert;
import com.appointmenthostpital.server.dtos.admin.AdminMedicineInventoryDTO;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.NotFoundResourceException;
import com.appointmenthostpital.server.models.MedicineCategoryModel;
import com.appointmenthostpital.server.models.MedicineInventoryModel;
import com.appointmenthostpital.server.repositories.MedicineInventoryRepository;
import com.appointmenthostpital.server.responses.MedicineInventoryResponse;

@Service
public class MedicineInventoryService {

    @Autowired
    private MedicineInventoryRepository medicineInventoryRepository;

    @Autowired
    private MedicineCategoryService medicineCategoryService;

    public List<MedicineInventoryResponse> handleGetMedicineList() {
        List<MedicineInventoryModel> medicines = medicineInventoryRepository.findAll();
        return medicines.stream().map(MedicineInventoryConvert::convertToResponse).collect(Collectors.toList());
    }

    public List<MedicineInventoryResponse> handleGetActiveMedicineList() {
        List<MedicineInventoryModel> medicines = medicineInventoryRepository.findAllActiveMedicines();
        return medicines.stream().map(MedicineInventoryConvert::convertToResponse).collect(Collectors.toList());
    }

    public List<MedicineInventoryResponse> handleGetMedicinesByCategoryId(Long categoryId) {
        List<MedicineInventoryModel> medicines = medicineInventoryRepository.findByCategoryId(categoryId);
        return medicines.stream().map(MedicineInventoryConvert::convertToResponse).collect(Collectors.toList());
    }

    public List<MedicineInventoryResponse> handleGetLowStockMedicines() {
        List<MedicineInventoryModel> medicines = medicineInventoryRepository.findLowStockMedicines();
        return medicines.stream().map(MedicineInventoryConvert::convertToResponse).collect(Collectors.toList());
    }

    public List<MedicineInventoryResponse> handleGetOutOfStockMedicines() {
        List<MedicineInventoryModel> medicines = medicineInventoryRepository.findOutOfStockMedicines();
        return medicines.stream().map(MedicineInventoryConvert::convertToResponse).collect(Collectors.toList());
    }

    public MedicineInventoryResponse handleCreateMedicine(AdminMedicineInventoryDTO.CreateMedicineRequest request) {
        if (medicineInventoryRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException("Thuốc với tên '" + request.getName() + "' đã tồn tại");
        }

        if (request.getBarcode() != null && !request.getBarcode().isEmpty()) {
            MedicineInventoryModel existingMedicine = medicineInventoryRepository.findByBarcode(request.getBarcode());
            if (existingMedicine != null) {
                throw new DuplicateResourceException("Thuốc với mã vạch '" + request.getBarcode() + "' đã tồn tại");
            }
        }

        MedicineCategoryModel category = medicineCategoryService.getCategoryById(request.getCategoryId());

        MedicineInventoryModel medicine = new MedicineInventoryModel();
        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setUnit(request.getUnit());
        medicine.setPrice(request.getPrice());
        medicine.setCostPrice(request.getCostPrice());
        medicine.setBarcode(request.getBarcode());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setStatus(request.getStatus());
        medicine.setCurrentStock(request.getCurrentStock());
        medicine.setMinStock(request.getMinStock());
        medicine.setMaxStock(request.getMaxStock());
        medicine.setCategoryModel(category);

        // Auto update status based on stock
        updateMedicineStatus(medicine);

        MedicineInventoryModel savedMedicine = medicineInventoryRepository.save(medicine);
        return MedicineInventoryConvert.convertToResponse(savedMedicine);
    }

    public MedicineInventoryResponse handleUpdateMedicine(Long id, AdminMedicineInventoryDTO.UpdateMedicineRequest request) {
        MedicineInventoryModel medicine = medicineInventoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy thuốc với ID: " + id));

        // Check if the new name already exists (excluding current medicine)
        MedicineInventoryModel existingMedicine = medicineInventoryRepository.findByNameAndNotId(request.getName(), id);
        if (existingMedicine != null) {
            throw new DuplicateResourceException("Thuốc với tên '" + request.getName() + "' đã tồn tại");
        }

        // Check if barcode already exists (if provided and different from current)
        if (request.getBarcode() != null && !request.getBarcode().isEmpty() 
            && !request.getBarcode().equals(medicine.getBarcode())) {
            MedicineInventoryModel existingByBarcode = medicineInventoryRepository.findByBarcode(request.getBarcode());
            if (existingByBarcode != null && !existingByBarcode.getId().equals(id)) {
                throw new DuplicateResourceException("Thuốc với mã vạch '" + request.getBarcode() + "' đã tồn tại");
            }
        }

        // Get category
        MedicineCategoryModel category = medicineCategoryService.getCategoryById(request.getCategoryId());

        medicine.setName(request.getName());
        medicine.setDescription(request.getDescription());
        medicine.setUnit(request.getUnit());
        medicine.setPrice(request.getPrice());
        medicine.setCostPrice(request.getCostPrice());
        medicine.setBarcode(request.getBarcode());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setExpiryDate(request.getExpiryDate());
        if (request.getStatus() != null) {
            medicine.setStatus(request.getStatus());
        }
        medicine.setCurrentStock(request.getCurrentStock());
        medicine.setMinStock(request.getMinStock());
        medicine.setMaxStock(request.getMaxStock());
        medicine.setCategoryModel(category);

        // Auto update status based on stock
        updateMedicineStatus(medicine);

        MedicineInventoryModel updatedMedicine = medicineInventoryRepository.save(medicine);
        return MedicineInventoryConvert.convertToResponse(updatedMedicine);
    }

    public void handleDeleteMedicine(Long id) {
        MedicineInventoryModel medicine = medicineInventoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy thuốc với ID: " + id));

        // Check if medicine has transactions
        if (medicine.getTransactions() != null && !medicine.getTransactions().isEmpty()) {
            throw new IllegalStateException("Không thể xóa thuốc vì vẫn còn giao dịch liên quan");
        }

        medicineInventoryRepository.delete(medicine);
    }

    public MedicineInventoryModel getMedicineById(Long id) {
        return medicineInventoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundResourceException("Không tìm thấy thuốc với ID: " + id));
    }

    public void updateMedicineStock(Long medicineId, Integer newStock) {
        MedicineInventoryModel medicine = getMedicineById(medicineId);
        medicine.setCurrentStock(newStock);
        updateMedicineStatus(medicine);
        medicineInventoryRepository.save(medicine);
    }

    private void updateMedicineStatus(MedicineInventoryModel medicine) {
        if (medicine.getCurrentStock() <= 0) {
            medicine.setStatus("out_of_stock");
        } else if (medicine.getCurrentStock() <= medicine.getMinStock()) {
            if (!"out_of_stock".equals(medicine.getStatus())) {
                medicine.setStatus("active");
            }
        }
    }
}
