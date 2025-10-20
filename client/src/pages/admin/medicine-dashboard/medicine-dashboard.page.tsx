import { useEffect, useState } from "react";
import { sampleMedicines, sampleMedicineCategories, sampleInventoryTransactions } from "../../../data/medicine.sample";

import type { MedicineResponse } from "../../../responses/medicine.response";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import type { InventoryTransactionResponse } from "../../../responses/inventory-transaction.response";

const AdminMedicineDashboardPage = () => {
    const [medicines, setMedicines] = useState<MedicineResponse[]>([]);
    const [categories, setCategories] = useState<MedicineCategoryResponse[]>([]);
    const [transactions, setTransactions] = useState<InventoryTransactionResponse[]>([]);

    // Tính toán thống kê
    const stats = {
        totalMedicines: medicines.length,
        activeMedicines: medicines.filter(m => m.status === 'active').length,
        outOfStockMedicines: medicines.filter(m => m.status === 'out_of_stock' || m.currentStock <= m.minStock).length,
        totalCategories: categories.length,
        totalInventoryValue: medicines.reduce((sum, m) => sum + (m.currentStock * m.costPrice), 0),
        totalSalesValue: transactions.filter(t => t.type === 'export' && t.status === 'completed').reduce((sum, t) => sum + t.totalAmount, 0),
        recentTransactions: transactions.slice(0, 5),
        lowStockMedicines: medicines.filter(m => m.currentStock <= m.minStock && m.currentStock > 0).slice(0, 5),
        expiringSoonMedicines: medicines.filter(m => {
            if (!m.expiryDate) return false;
            const expiryDate = new Date(m.expiryDate);
            const today = new Date();
            const diffTime = expiryDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30 && diffDays > 0;
        }).slice(0, 5)
    };

    useEffect(() => {
        // Load dữ liệu mẫu
        setMedicines(sampleMedicines);
        setCategories(sampleMedicineCategories);
        setTransactions(sampleInventoryTransactions);
    }, []);

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Tổng quan hệ thống thuốc
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Cập nhật lần cuối: <span className="font-semibold text-blue-600">{new Date().toLocaleString('vi-VN')}</span></div>
                    </div>
                </div>

                {/* Thống kê tổng quan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-pills text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng số thuốc</p>
                                <p className="text-lg font-semibold">{stats.totalMedicines}</p>
                                <p className="text-xs text-green-600">Hoạt động: {stats.activeMedicines}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-exclamation-triangle text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Cảnh báo tồn kho</p>
                                <p className="text-lg font-semibold text-red-600">{stats.outOfStockMedicines}</p>
                                <p className="text-xs text-red-600">Cần bổ sung</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-money-bill text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Giá trị tồn kho</p>
                                <p className="text-lg font-semibold">{stats.totalInventoryValue.toLocaleString()}đ</p>
                                <p className="text-xs text-green-600">Vốn đầu tư</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-chart-line text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Doanh thu bán hàng</p>
                                <p className="text-lg font-semibold">{stats.totalSalesValue.toLocaleString()}đ</p>
                                <p className="text-xs text-purple-600">Tháng này</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cảnh báo và thông tin quan trọng */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Thuốc sắp hết hạn */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-orange-700 flex items-center">
                                <i className="fa-solid fa-calendar-times mr-2"></i>
                                Thuốc sắp hết hạn (30 ngày)
                            </h4>
                        </div>
                        <div className="p-4">
                            {stats.expiringSoonMedicines.length > 0 ? (
                                <div className="space-y-3">
                                    {stats.expiringSoonMedicines.map((medicine) => (
                                        <div key={medicine.id} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-orange-800">{medicine.name}</p>
                                                <p className="text-sm text-orange-600">Hết hạn: {medicine.expiryDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-orange-800">{medicine.currentStock} {medicine.unit}</p>
                                                <p className="text-sm text-orange-600">Tồn kho</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Không có thuốc sắp hết hạn</p>
                            )}
                        </div>
                    </div>

                    {/* Thuốc tồn kho thấp */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-red-700 flex items-center">
                                <i className="fa-solid fa-box-open mr-2"></i>
                                Thuốc tồn kho thấp
                            </h4>
                        </div>
                        <div className="p-4">
                            {stats.lowStockMedicines.length > 0 ? (
                                <div className="space-y-3">
                                    {stats.lowStockMedicines.map((medicine) => (
                                        <div key={medicine.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-red-800">{medicine.name}</p>
                                                <p className="text-sm text-red-600">Tối thiểu: {medicine.minStock} {medicine.unit}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-red-800">{medicine.currentStock} {medicine.unit}</p>
                                                <p className="text-sm text-red-600">Hiện tại</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">Tất cả thuốc đều đủ tồn kho</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Giao dịch gần đây */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                        <h4 className="text-lg font-semibold text-blue-700 flex items-center">
                            <i className="fa-solid fa-history mr-2"></i>
                            Giao dịch gần đây
                        </h4>
                    </div>
                    <div className="p-4">
                        {stats.recentTransactions.length > 0 ? (
                            <div className="space-y-3">
                                {stats.recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                transaction.type === 'import' ? 'bg-green-100' :
                                                transaction.type === 'export' ? 'bg-red-100' : 'bg-yellow-100'
                                            }`}>
                                                <i className={`fa-solid ${
                                                    transaction.type === 'import' ? 'fa-download text-green-600' :
                                                    transaction.type === 'export' ? 'fa-upload text-red-600' : 'fa-adjust text-yellow-600'
                                                }`}></i>
                                            </div>
                                            <div>
                                                <p className="font-medium">{transaction.medicineName}</p>
                                                <p className="text-sm text-gray-600">
                                                    {transaction.type === 'import' ? 'Nhập hàng' :
                                                     transaction.type === 'export' ? 'Xuất hàng' : 'Điều chỉnh'}
                                                    {' - '}
                                                    {transaction.reason}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-medium ${transaction.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                                            </p>
                                            <p className="text-sm text-gray-600">{transaction.totalAmount.toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">Chưa có giao dịch nào</p>
                        )}
                    </div>
                </div>

                {/* Nút điều hướng nhanh */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition-colors">
                        <i className="fa-solid fa-pills mr-2"></i>
                        Quản lý thuốc
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-semibold transition-colors">
                        <i className="fa-solid fa-download mr-2"></i>
                        Nhập hàng
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-semibold transition-colors">
                        <i className="fa-solid fa-upload mr-2"></i>
                        Xuất hàng
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-semibold transition-colors">
                        <i className="fa-solid fa-chart-bar mr-2"></i>
                        Báo cáo
                    </button>
                </div>
            </div>
        </main>
    )
}

export default AdminMedicineDashboardPage;
