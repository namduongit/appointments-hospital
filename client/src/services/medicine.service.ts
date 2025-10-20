import { api, type RestResponse } from "../api/api";

type CreateMedicineCategoryParams = {
    name: string, 
    description?: string
}

export const getMedicineCategoryList = async () => {
    const response = await api.get("/api/medicine-categories");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createMedicineCategory = async (params: CreateMedicineCategoryParams) => {
    const response = await api.post("/api/medicine-categories",params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateMedicineCategory = async (id: number, name: string, description?: string, status?: string) => {
    const response = await api.put(`/api/medicine-categories/${id}`, { 
        name: name,
        description: description,
        status: status
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteMedicineCategory = async (id: number) => {
    const response = await api.delete(`/api/medicine-categories/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

// Medicine Services
export const getMedicineList = async () => {
    const response = await api.get("/api/medicines");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createMedicine = async (medicineData: {
    name: string;
    description?: string;
    unit: string;
    price: number;
    costPrice: number;
    barcode?: string;
    manufacturer?: string;
    expiryDate?: string;
    minStock: number;
    maxStock: number;
    categoryId: number;
}) => {
    const response = await api.post("/api/medicines", medicineData);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateMedicine = async (id: number, medicineData: {
    name?: string;
    description?: string;
    unit?: string;
    price?: number;
    costPrice?: number;
    barcode?: string;
    manufacturer?: string;
    expiryDate?: string;
    status?: string;
    minStock?: number;
    maxStock?: number;
    categoryId?: number;
}) => {
    const response = await api.put(`/api/medicines/${id}`, medicineData);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteMedicine = async (id: number) => {
    const response = await api.delete(`/api/medicines/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}
