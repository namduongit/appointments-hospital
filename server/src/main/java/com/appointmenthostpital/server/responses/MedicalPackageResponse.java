package com.appointmenthostpital.server.responses;

public class MedicalPackageResponse {
    private Long id;
    private String name;
    private String description;
    private String status;
    private Long price;

    public MedicalPackageResponse() {
    }

    public MedicalPackageResponse(Long id, String name, String description, String status, Long price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.price = price;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
}
