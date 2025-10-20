export interface InventoryTransactionModel {
    id: number;
    medicineId: number;
    type: string; // 'import', 'export', 'adjustment'
    quantity: number; // Số lượng (âm cho xuất, dương cho nhập)
    unitPrice: number; // Giá đơn vị tại thời điểm giao dịch
    totalAmount: number; // Tổng tiền
    reason?: string; // Lý do (bán, hỏng, hết hạn, điều chỉnh,...)
    reference?: string; // Số hóa đơn, phiếu nhập/xuất
    batchNumber?: string; // Số lô
    expiryDate?: Date; // Hạn sử dụng của lô
    supplierName?: string; // Tên nhà cung cấp (cho nhập hàng)
    customerName?: string; // Tên khách hàng (cho xuất hàng)
    status: string; // pending, completed, cancelled
    performedBy: string; // Người thực hiện
    
    createdAt: Date;
    updatedAt: Date;
}
