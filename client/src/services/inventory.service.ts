import { api, type RestResponse } from "../api/api";

// Inventory Transaction Services
export const getInventoryTransactionList = async () => {
    const response = await api.get("/api/inventory-transactions");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createInventoryTransaction = async (transactionData: {
    medicineId: number;
    type: string; // 'import', 'export', 'adjustment'
    quantity: number;
    unitPrice: number;
    reason?: string;
    reference?: string;
    batchNumber?: string;
    expiryDate?: string;
    supplierName?: string;
    customerName?: string;
    performedBy: string;
}) => {
    const response = await api.post("/api/inventory-transactions", transactionData);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateInventoryTransaction = async (id: number, transactionData: {
    status?: string;
    reason?: string;
    reference?: string;
}) => {
    const response = await api.put(`/api/inventory-transactions/${id}`, transactionData);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteInventoryTransaction = async (id: number) => {
    const response = await api.delete(`/api/inventory-transactions/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

// Import/Export specific functions
export const createImportTransaction = async (importData: {
    medicineId: number;
    quantity: number;
    unitPrice: number;
    supplierName: string;
    batchNumber?: string;
    expiryDate?: string;
    reference?: string;
    performedBy: string;
}) => {
    return createInventoryTransaction({
        ...importData,
        type: 'import',
        reason: 'Nhập hàng'
    });
}

export const createExportTransaction = async (exportData: {
    medicineId: number;
    quantity: number;
    unitPrice: number;
    customerName?: string;
    reason: string;
    reference?: string;
    performedBy: string;
}) => {
    return createInventoryTransaction({
        ...exportData,
        type: 'export',
        quantity: -Math.abs(exportData.quantity) // Đảm bảo số âm cho xuất
    });
}

export const createAdjustmentTransaction = async (adjustmentData: {
    medicineId: number;
    quantity: number;
    unitPrice: number;
    reason: string;
    reference?: string;
    performedBy: string;
}) => {
    return createInventoryTransaction({
        ...adjustmentData,
        type: 'adjustment'
    });
}
