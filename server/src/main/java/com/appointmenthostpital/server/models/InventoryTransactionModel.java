package com.appointmenthostpital.server.models;

import java.math.BigDecimal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "inventory_transactions")
public class InventoryTransactionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    @JsonBackReference
    private MedicineInventoryModel medicine;
    
    @Column(columnDefinition = "enum('import', 'export', 'adjustment') default 'import'", nullable = false)
    private String type = "import";
    
    @Column(nullable = false)
    private Integer quantity; // Âm cho xuất, dương cho nhập
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;
    
    private String reason; // Lý do giao dịch
    
    private String reference; // Số hóa đơn/phiếu
    
    private String batchNumber; // Số lô
    
    @Temporal(TemporalType.DATE)
    private Date expiryDate;
    
    private String supplierName; // Nhà cung cấp
    
    private String customerName; // Khách hàng
    
    @Column(columnDefinition = "enum('pending', 'completed', 'cancelled') default 'pending'", nullable = false)
    private String status = "pending";
    
    @Column(nullable = false)
    private String performedBy; // Người thực hiện
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    public InventoryTransactionModel() {
    }

    public InventoryTransactionModel(MedicineInventoryModel medicine, String type, Integer quantity, 
                                   BigDecimal unitPrice, BigDecimal totalAmount, String reason, 
                                   String reference, String batchNumber, Date expiryDate, 
                                   String supplierName, String customerName, String status, 
                                   String performedBy) {
        this.medicine = medicine;
        this.type = type;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalAmount = totalAmount;
        this.reason = reason;
        this.reference = reference;
        this.batchNumber = batchNumber;
        this.expiryDate = expiryDate;
        this.supplierName = supplierName;
        this.customerName = customerName;
        this.status = status;
        this.performedBy = performedBy;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MedicineInventoryModel getMedicine() {
        return medicine;
    }

    public void setMedicine(MedicineInventoryModel medicine) {
        this.medicine = medicine;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPerformedBy() {
        return performedBy;
    }

    public void setPerformedBy(String performedBy) {
        this.performedBy = performedBy;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
