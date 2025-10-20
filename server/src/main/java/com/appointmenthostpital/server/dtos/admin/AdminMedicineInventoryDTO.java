package com.appointmenthostpital.server.dtos.admin;

import java.util.Date;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AdminMedicineInventoryDTO {

    public static class CreateMedicineRequest {
        @NotBlank(message = "Tên thuốc không được để trống")
        @Size(max = 255, message = "Tên thuốc không được vượt quá 255 ký tự")
        private String name;

        @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
        private String description;

        @NotBlank(message = "Đơn vị tính không được để trống")
        private String unit;

        @NotNull(message = "Giá bán không được để trống")
        @DecimalMin(value = "0.0", inclusive = false, message = "Giá bán phải lớn hơn 0")
        private Long price;

        @NotNull(message = "Giá nhập không được để trống")
        @DecimalMin(value = "0.0", inclusive = false, message = "Giá nhập phải lớn hơn 0")
        private Long costPrice;

        private String barcode;

        private String manufacturer;

        private Date expiryDate;

        private String status = "active";

        @Min(value = 0, message = "Số lượng hiện tại không được âm")
        private Integer currentStock = 0;

        @Min(value = 0, message = "Số lượng tối thiểu không được âm")
        private Integer minStock = 0;

        @Min(value = 1, message = "Số lượng tối đa phải lớn hơn 0")
        private Integer maxStock = 1000;

        @NotNull(message = "ID danh mục không được để trống")
        private Long categoryId;

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

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }

    public static class UpdateMedicineRequest {
        @NotBlank(message = "Tên thuốc không được để trống")
        @Size(max = 255, message = "Tên thuốc không được vượt quá 255 ký tự")
        private String name;

        @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
        private String description;

        @NotBlank(message = "Đơn vị tính không được để trống")
        private String unit;

        @NotNull(message = "Giá bán không được để trống")
        @DecimalMin(value = "0.0", inclusive = false, message = "Giá bán phải lớn hơn 0")
        private Long price;

        @NotNull(message = "Giá nhập không được để trống")
        @DecimalMin(value = "0.0", inclusive = false, message = "Giá nhập phải lớn hơn 0")
        private Long costPrice;

        private String barcode;

        private String manufacturer;

        private Date expiryDate;

        private String status;

        @Min(value = 0, message = "Số lượng hiện tại không được âm")
        private Integer currentStock;

        @Min(value = 0, message = "Số lượng tối thiểu không được âm")
        private Integer minStock;

        @Min(value = 1, message = "Số lượng tối đa phải lớn hơn 0")
        private Integer maxStock;

        @NotNull(message = "ID danh mục không được để trống")
        private Long categoryId;

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

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
