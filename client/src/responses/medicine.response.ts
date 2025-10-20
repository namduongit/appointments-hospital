type MedicineResponse = {
    id: number;
    name: string;
    description?: string;
    unit: string;
    price: number;
    costPrice: number;
    barcode?: string;
    manufacturer?: string;
    expiryDate?: string;
    status: string;
    currentStock: number;
    minStock: number;
    maxStock: number;
    categoryId: number;
    categoryName?: string;
    createdAt: string;
    updatedAt: string;
}

export type { MedicineResponse };
