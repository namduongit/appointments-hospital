package com.appointmenthostpital.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.MedicineInventoryModel;

@Repository
public interface MedicineInventoryRepository extends JpaRepository<MedicineInventoryModel, Long> {
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.status = 'active' ORDER BY m.name ASC")
    List<MedicineInventoryModel> findAllActiveMedicines();
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.categoryModel.id = :categoryId ORDER BY m.name ASC")
    List<MedicineInventoryModel> findByCategoryId(@Param("categoryId") Long categoryId);
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.currentStock <= m.minStock")
    List<MedicineInventoryModel> findLowStockMedicines();
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.status = 'out_of_stock'")
    List<MedicineInventoryModel> findOutOfStockMedicines();
    
    boolean existsByName(String name);
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.name = :name AND m.id != :id")
    MedicineInventoryModel findByNameAndNotId(@Param("name") String name, @Param("id") Long id);
    
    @Query("SELECT m FROM MedicineInventoryModel m WHERE m.barcode = :barcode")
    MedicineInventoryModel findByBarcode(@Param("barcode") String barcode);
}
