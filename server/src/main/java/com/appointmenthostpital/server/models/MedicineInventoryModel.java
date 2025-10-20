package com.appointmenthostpital.server.models;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "medicines_inventory")
public class MedicineInventoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @Column(nullable = false)
    private String unit;
    
    @Column(nullable = false)
    private Long price;
    
    @Column(nullable = false)
    private Long costPrice;
    
    private String barcode;
    
    private String manufacturer;
    
    @Temporal(TemporalType.DATE)
    private Date expiryDate;
    
    @Column(columnDefinition = "enum('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK') default 'ACTIVE'")
    private String status = "ACTIVE";
    
    @Column(nullable = false)
    private Integer currentStock = 0; 
    
    @Column(nullable = false)
    private Integer minStock = 0;
    
    @Column(nullable = false)
    private Integer maxStock = 1000; 
    
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference
    private MedicineCategoryModel categoryModel;
    
    @OneToMany(mappedBy = "medicine", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<InventoryTransactionModel> transactions;

    public MedicineInventoryModel() {
    }

    public MedicineInventoryModel(String name, String description, String unit, Long price, 
                                Long costPrice, String barcode, String manufacturer, 
                                Date expiryDate, String status, Integer currentStock, 
                                Integer minStock, Integer maxStock, MedicineCategoryModel categoryModel) {
        this.name = name;
        this.description = description;
        this.unit = unit;
        this.price = price;
        this.costPrice = costPrice;
        this.barcode = barcode;
        this.manufacturer = manufacturer;
        this.expiryDate = expiryDate;
        this.status = status;
        this.currentStock = currentStock;
        this.minStock = minStock;
        this.maxStock = maxStock;
        this.categoryModel = categoryModel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getCostPrice() {
        return costPrice;
    }

    public void setCostPrice(Long costPrice) {
        this.costPrice = costPrice;
    }

    public String getBarcode() {
        return barcode;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCurrentStock() {
        return currentStock;
    }

    public void setCurrentStock(Integer currentStock) {
        this.currentStock = currentStock;
    }

    public Integer getMinStock() {
        return minStock;
    }

    public void setMinStock(Integer minStock) {
        this.minStock = minStock;
    }

    public Integer getMaxStock() {
        return maxStock;
    }

    public void setMaxStock(Integer maxStock) {
        this.maxStock = maxStock;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public MedicineCategoryModel getCategoryModel() {
        return categoryModel;
    }

    public void setCategoryModel(MedicineCategoryModel categoryModel) {
        this.categoryModel = categoryModel;
    }

    public List<InventoryTransactionModel> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<InventoryTransactionModel> transactions) {
        this.transactions = transactions;
    }
}
