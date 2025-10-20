import { useEffect, useState } from "react";
import { transactionTypes, transactionStatus } from "../../../constants/medicine.constant";
import { sampleInventoryTransactions } from "../../../data/medicine.sample";

import type { InventoryTransactionResponse } from "../../../responses/inventory-transaction.response";

const AdminInventoryPage = () => {
    const [select, setSelect] = useState<string>("all");

    const [transactions, setTransactions] = useState<InventoryTransactionResponse[]>([]);
    const [transactionsFilter, setTransactionsFilter] = useState<InventoryTransactionResponse[]>([]);

    const [isOpenCreateImport, setIsOpenCreateImport] = useState<boolean>(false);
    const [isOpenCreateExport, setIsOpenCreateExport] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        type: ""
    });

    const handleSearchFormChange = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    // Tính toán thống kê
    const stats = {
        totalTransactions: transactions.length,
        totalImports: transactions.filter(t => t.type === 'import').length,
        totalExports: transactions.filter(t => t.type === 'export').length,
        totalValue: transactions.reduce((sum, t) => sum + t.totalAmount, 0),
        pendingTransactions: transactions.filter(t => t.status === 'pending').length
    };

    useEffect(() => {
        let filtered = transactions.filter(transaction => {
            const matchesInput =
                searchForm.input === "" ||
                transaction.medicineName?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                transaction.id?.toString().includes(searchForm.input) ||
                transaction.reference?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                transaction.supplierName?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                transaction.customerName?.toLowerCase().includes(searchForm.input.toLowerCase());

            const matchesStatus =
                searchForm.status === "" || transaction.status === searchForm.status;

            const matchesType =
                searchForm.type === "" || transaction.type === searchForm.type;

            const matchesSelect = 
                select === "all" || 
                (select === "import" && transaction.type === "import") ||
                (select === "export" && transaction.type === "export") ||
                (select === "adjustment" && transaction.type === "adjustment");

            return matchesInput && matchesStatus && matchesType && matchesSelect;
        });

        setTransactionsFilter(filtered);
    }, [searchForm, transactions, select]);

    useEffect(() => {
        // Load dữ liệu mẫu
        setTransactions(sampleInventoryTransactions);
        setTransactionsFilter(sampleInventoryTransactions);
    }, []);

    const getTypeDisplay = (type: string) => {
        switch(type) {
            case 'import': return { text: 'Nhập hàng', color: 'bg-green-100 text-green-800' };
            case 'export': return { text: 'Xuất hàng', color: 'bg-red-100 text-red-800' };
            case 'adjustment': return { text: 'Điều chỉnh', color: 'bg-yellow-100 text-yellow-800' };
            default: return { text: type, color: 'bg-gray-100 text-gray-800' };
        }
    };

    const getStatusDisplay = (status: string) => {
        switch(status) {
            case 'completed': return { text: 'Hoàn thành', color: 'bg-green-100 text-green-800' };
            case 'pending': return { text: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800' };
            case 'cancelled': return { text: 'Đã hủy', color: 'bg-red-100 text-red-800' };
            default: return { text: status, color: 'bg-gray-100 text-gray-800' };
        }
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý nhập xuất kho
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Tổng giao dịch: <span className="font-semibold text-blue-600">{stats.totalTransactions}</span></div>
                        <div>Chờ xử lý: <span className="font-semibold text-yellow-600">{stats.pendingTransactions}</span></div>
                    </div>
                </div>

                {/* Thống kê tổng quan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-download text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Nhập hàng</p>
                                <p className="text-lg font-semibold">{stats.totalImports}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-upload text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Xuất hàng</p>
                                <p className="text-lg font-semibold">{stats.totalExports}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-money-bill text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng giá trị</p>
                                <p className="text-lg font-semibold">{stats.totalValue.toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fa-solid fa-clock text-yellow-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Chờ xử lý</p>
                                <p className="text-lg font-semibold">{stats.pendingTransactions}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                            <div className="appointments__filter__item relative flex-1">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchForm.input}
                                    onChange={(event) => handleSearchFormChange("input", event.target.value)}
                                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm kiếm theo thuốc, mã giao dịch..."
                                />
                            </div>

                            <div className="flex-1">
                                <select
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={searchForm.type}
                                    onChange={(event) => handleSearchFormChange("type", event.target.value)}
                                >
                                    <option value="">Loại giao dịch</option>
                                    {transactionTypes.map((type) => (
                                        <option key={type.id} value={type.value}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <select
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={searchForm.status}
                                    onChange={(event) => handleSearchFormChange("status", event.target.value)}
                                >
                                    <option value="">Trạng thái</option>
                                    {transactionStatus.map((status) => (
                                        <option key={status.id} value={status.value}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-2">
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                        select === "all" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                    }`}
                                    onClick={() => setSelect("all")}
                                >
                                    Tất cả
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                        select === "import" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                    }`}
                                    onClick={() => setSelect("import")}
                                >
                                    Nhập hàng
                                </button>
                                <button
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                        select === "export" ? "bg-white text-blue-600 shadow" : "text-gray-600"
                                    }`}
                                    onClick={() => setSelect("export")}
                                >
                                    Xuất hàng
                                </button>
                            </div>
                            <button 
                                className="font-semibold bg-green-600 text-white hover:text-green-600 hover:bg-white hover:ring-3 hover:ring-green-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                                onClick={() => setIsOpenCreateImport(true)}
                            >
                                <i className="fa-solid fa-download me-2"></i>
                                <span>Nhập hàng</span>
                            </button>
                            <button 
                                className="font-semibold bg-red-600 text-white hover:text-red-600 hover:bg-white hover:ring-3 hover:ring-red-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                                onClick={() => setIsOpenCreateExport(true)}
                            >
                                <i className="fa-solid fa-upload me-2"></i>
                                <span>Xuất hàng</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="p-4">
                            <h4 className="text-lg font-semibold mb-4">Lịch sử giao dịch ({transactionsFilter.length})</h4>
                            <div className="space-y-4">
                                {transactionsFilter.map((transaction) => {
                                    const typeDisplay = getTypeDisplay(transaction.type);
                                    const statusDisplay = getStatusDisplay(transaction.status);
                                    
                                    return (
                                        <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h5 className="font-semibold text-lg text-blue-700">#{transaction.id}</h5>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeDisplay.color}`}>
                                                            {typeDisplay.text}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                                                            {statusDisplay.text}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                        <div>
                                                            <span className="text-xs text-gray-500">Thuốc:</span>
                                                            <p className="font-medium">{transaction.medicineName}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500">Số lượng:</span>
                                                            <p className={`font-medium ${transaction.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500">Đơn giá:</span>
                                                            <p className="font-medium">{transaction.unitPrice.toLocaleString()}đ</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500">Tổng tiền:</span>
                                                            <p className="font-medium text-blue-600">{transaction.totalAmount.toLocaleString()}đ</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                        {transaction.reference && (
                                                            <div>
                                                                <span className="text-xs text-gray-500">Mã tham chiếu:</span>
                                                                <p className="font-medium text-sm">{transaction.reference}</p>
                                                            </div>
                                                        )}
                                                        {transaction.batchNumber && (
                                                            <div>
                                                                <span className="text-xs text-gray-500">Số lô:</span>
                                                                <p className="font-medium text-sm">{transaction.batchNumber}</p>
                                                            </div>
                                                        )}
                                                        {transaction.supplierName && (
                                                            <div>
                                                                <span className="text-xs text-gray-500">Nhà cung cấp:</span>
                                                                <p className="font-medium text-sm">{transaction.supplierName}</p>
                                                            </div>
                                                        )}
                                                        {transaction.customerName && (
                                                            <div>
                                                                <span className="text-xs text-gray-500">Khách hàng:</span>
                                                                <p className="font-medium text-sm">{transaction.customerName}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <span className="text-xs text-gray-500">Lý do:</span>
                                                            <p className="font-medium text-sm">{transaction.reason}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500">Người thực hiện:</span>
                                                            <p className="font-medium text-sm">{transaction.performedBy}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500">Ngày tạo:</span>
                                                            <p className="font-medium text-sm">{new Date(transaction.createdAt).toLocaleDateString('vi-VN')}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 ml-4">
                                                    <button className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                                        <i className="fa-solid fa-info"></i>
                                                    </button>
                                                    <button className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                                        <i className="fa-solid fa-wrench"></i>
                                                    </button>
                                                    <button className="p-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                                        <i className="fa-solid fa-print"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal nhập hàng */}
            {isOpenCreateImport && (
                <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold mb-4 text-green-700">Phiếu nhập hàng</h2>
                        <p>Form nhập hàng đang được phát triển...</p>
                        <button 
                            onClick={() => setIsOpenCreateImport(false)}
                            className="mt-4 px-4 py-2 bg-gray-300 rounded"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

            {/* Modal xuất hàng */}
            {isOpenCreateExport && (
                <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold mb-4 text-red-700">Phiếu xuất hàng</h2>
                        <p>Form xuất hàng đang được phát triển...</p>
                        <button 
                            onClick={() => setIsOpenCreateExport(false)}
                            className="mt-4 px-4 py-2 bg-gray-300 rounded"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}

        </main >
    )
}

export default AdminInventoryPage;
