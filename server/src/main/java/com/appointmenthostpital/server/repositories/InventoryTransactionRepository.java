package com.appointmenthostpital.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.appointmenthostpital.server.models.InventoryTransactionModel;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransactionModel, Long> {
    
    @Query("SELECT it FROM InventoryTransactionModel it WHERE it.medicine.id = :medicineId ORDER BY it.createdAt DESC")
    List<InventoryTransactionModel> findByMedicineId(@Param("medicineId") Long medicineId);
    
    @Query("SELECT it FROM InventoryTransactionModel it WHERE it.type = :type ORDER BY it.createdAt DESC")
    List<InventoryTransactionModel> findByType(@Param("type") String type);
    
    @Query("SELECT it FROM InventoryTransactionModel it WHERE it.status = :status ORDER BY it.createdAt DESC")
    List<InventoryTransactionModel> findByStatus(@Param("status") String status);
    
    @Query("SELECT it FROM InventoryTransactionModel it WHERE it.performedBy = :performedBy ORDER BY it.createdAt DESC")
    List<InventoryTransactionModel> findByPerformedBy(@Param("performedBy") String performedBy);
    
    @Query("SELECT it FROM InventoryTransactionModel it ORDER BY it.createdAt DESC")
    List<InventoryTransactionModel> findAllOrderByCreatedAtDesc();
}
