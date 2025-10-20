export interface MedicineModel {
    id: number;
    name: string;
    description?: string;
    unit: string; // Đơn vị tính (viên, ml, gói, ...)
    price: number; // Giá bán
    costPrice: number; // Giá nhập
    barcode?: string;
    manufacturer?: string; // Nhà sản xuất
    expiryDate?: Date;
    status: string; // active, inactive, out_of_stock
    currentStock: number; // Số lượng hiện tại trong kho
    minStock: number; // Số lượng tối thiểu
    maxStock: number; // Số lượng tối đa
    categoryId: number;
    
    createdAt: Date;
    updatedAt: Date;
}
