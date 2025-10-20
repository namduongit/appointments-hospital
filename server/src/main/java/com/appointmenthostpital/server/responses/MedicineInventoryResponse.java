package com.appointmenthostpital.server.responses;

import java.sql.Timestamp;
import java.util.Date;

public class MedicineInventoryResponse {
    private Long id;
    private String name;
    private String description;
    private String unit;
    private Long price;
    private Long costPrice;
    private String barcode;
    private String manufacturer;
    private Date expiryDate;
    private String status;
    private Integer currentStock;
    private Integer minStock;
    private Integer maxStock;
    private Timestamp createdAt;
    
    private Long categoryId;
    private String categoryName;
    
    private Boolean isLowStock;
    private Boolean isOutOfStock;

    public MedicineInventoryResponse() {
    }

    public MedicineInventoryResponse(Long id, String name, String description, String unit, 
                                   Long price, Long costPrice, String barcode, 
                                   String manufacturer, Date expiryDate, String status, 
                                   Integer currentStock, Integer minStock, Integer maxStock, 
                                   Timestamp createdAt, Long categoryId, 
                                   String categoryName) {
        this.id = id;
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
        this.createdAt = createdAt;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.isLowStock = currentStock <= minStock;
        this.isOutOfStock = "out_of_stock".equals(status);
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
        this.isLowStock = currentStock <= minStock;
    }

    public Integer getMinStock() {
        return minStock;
    }

    public void setMinStock(Integer minStock) {
        this.minStock = minStock;
        this.isLowStock = currentStock <= minStock;
    }

    public Integer getMaxStock() {
        return maxStock;
    }

    public void setMaxStock(Integer maxStock) {
        this.maxStock = maxStock;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Boolean getIsLowStock() {
        return isLowStock;
    }

    public void setIsLowStock(Boolean isLowStock) {
        this.isLowStock = isLowStock;
    }

    public Boolean getIsOutOfStock() {
        return isOutOfStock;
    }

    public void setIsOutOfStock(Boolean isOutOfStock) {
        this.isOutOfStock = isOutOfStock;
    }
}
