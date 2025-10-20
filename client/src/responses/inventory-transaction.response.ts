type InventoryTransactionResponse = {
    id: number;
    medicineId: number;
    medicineName?: string;
    type: string; // 'import', 'export', 'adjustment'
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    reason?: string;
    reference?: string;
    batchNumber?: string;
    expiryDate?: string;
    supplierName?: string;
    customerName?: string;
    status: string;
    performedBy: string;
    createdAt: string;
    updatedAt: string;
}

export type { InventoryTransactionResponse };
