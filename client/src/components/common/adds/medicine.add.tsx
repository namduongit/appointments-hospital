import { useState, useEffect } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { createMedicine, getMedicineCategoryList } from "../../../services/medicine.service";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";

type AddMedicineModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const AddMedicineModal = ({ isOpen, onClose, onSuccess }: AddMedicineModalProps) => {
    const { execute, notify, loading } = useCallApi();

    const [categories, setCategories] = useState<MedicineCategoryResponse[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        unit: "",
        price: "",
        costPrice: "",
        barcode: "",
        manufacturer: "",
        expiryDate: "",
        minStock: "",
        maxStock: "",
        categoryId: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        unit: "",
        price: "",
        costPrice: "",
        minStock: "",
        maxStock: "",
        categoryId: ""
    });

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            unit: "",
            price: "",
            costPrice: "",
            minStock: "",
            maxStock: "",
            categoryId: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Tên thuốc không được để trống";
        }

        if (!formData.unit.trim()) {
            newErrors.unit = "Đơn vị tính không được để trống";
        }

        if (!formData.price.trim()) {
            newErrors.price = "Giá bán không được để trống";
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "Giá bán phải là số dương";
        }

        if (!formData.costPrice.trim()) {
            newErrors.costPrice = "Giá nhập không được để trống";
        } else if (isNaN(Number(formData.costPrice)) || Number(formData.costPrice) <= 0) {
            newErrors.costPrice = "Giá nhập phải là số dương";
        }

        if (!formData.minStock.trim()) {
            newErrors.minStock = "Tồn kho tối thiểu không được để trống";
        } else if (isNaN(Number(formData.minStock)) || Number(formData.minStock) < 0) {
            newErrors.minStock = "Tồn kho tối thiểu phải là số không âm";
        }

        if (!formData.maxStock.trim()) {
            newErrors.maxStock = "Tồn kho tối đa không được để trống";
        } else if (isNaN(Number(formData.maxStock)) || Number(formData.maxStock) < 0) {
            newErrors.maxStock = "Tồn kho tối đa phải là số không âm";
        }

        if (formData.minStock && formData.maxStock && Number(formData.minStock) > Number(formData.maxStock)) {
            newErrors.maxStock = "Tồn kho tối đa phải lớn hơn hoặc bằng tồn kho tối thiểu";
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Vui lòng chọn loại thuốc";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        const medicineData = {
            name: formData.name,
            description: formData.description || undefined,
            unit: formData.unit,
            price: Number(formData.price),
            costPrice: Number(formData.costPrice),
            barcode: formData.barcode || undefined,
            manufacturer: formData.manufacturer || undefined,
            expiryDate: formData.expiryDate || undefined,
            minStock: Number(formData.minStock),
            maxStock: Number(formData.maxStock),
            categoryId: Number(formData.categoryId)
        };

        try {
            const response = await execute(createMedicine(medicineData));
            
            if (response?.result) {
                notify(response, "Thêm thuốc thành công!");
                handleClose();
                onSuccess?.();
            } else {
                notify(response);
            }
        } catch (error) {
            console.error("Error creating medicine:", error);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            description: "",
            unit: "",
            price: "",
            costPrice: "",
            barcode: "",
            manufacturer: "",
            expiryDate: "",
            minStock: "",
            maxStock: "",
            categoryId: ""
        });
        setErrors({
            name: "",
            unit: "",
            price: "",
            costPrice: "",
            minStock: "",
            maxStock: "",
            categoryId: ""
        });
        onClose();
    };

    const fetchCategories = async () => {
        try {
            const response = await execute(getMedicineCategoryList());
            if (response?.result) {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 bg-gray-400/60 w-full h-full z-50 flex justify-center items-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Thêm thuốc mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tên thuốc */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên thuốc <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Nhập tên thuốc"
                                disabled={loading}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Đơn vị tính */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đơn vị tính <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.unit}
                                onChange={(e) => handleInputChange("unit", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.unit ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="VD: viên, ml, gói"
                                disabled={loading}
                            />
                            {errors.unit && (
                                <p className="text-red-500 text-sm mt-1">{errors.unit}</p>
                            )}
                        </div>

                        {/* Giá bán */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giá bán (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleInputChange("price", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.price ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Nhập giá bán"
                                min="0"
                                step="0.01"
                                disabled={loading}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Giá nhập */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giá nhập (VNĐ) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.costPrice}
                                onChange={(e) => handleInputChange("costPrice", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.costPrice ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Nhập giá nhập"
                                min="0"
                                step="0.01"
                                disabled={loading}
                            />
                            {errors.costPrice && (
                                <p className="text-red-500 text-sm mt-1">{errors.costPrice}</p>
                            )}
                        </div>

                        {/* Mã vạch */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mã vạch
                            </label>
                            <input
                                type="text"
                                value={formData.barcode}
                                onChange={(e) => handleInputChange("barcode", e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Nhập mã vạch (tùy chọn)"
                                disabled={loading}
                            />
                        </div>

                        {/* Nhà sản xuất */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhà sản xuất
                            </label>
                            <input
                                type="text"
                                value={formData.manufacturer}
                                onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Nhập nhà sản xuất (tùy chọn)"
                                disabled={loading}
                            />
                        </div>

                        {/* Ngày hết hạn */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày hết hạn
                            </label>
                            <input
                                type="date"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                disabled={loading}
                            />
                        </div>

                        {/* Loại thuốc */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loại thuốc <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.categoryId ? "border-red-500" : "border-gray-300"
                                }`}
                                disabled={loading}
                            >
                                <option value="">Chọn loại thuốc</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && (
                                <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                            )}
                        </div>

                        {/* Tồn kho tối thiểu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tồn kho tối thiểu <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.minStock}
                                onChange={(e) => handleInputChange("minStock", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.minStock ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Nhập số lượng tối thiểu"
                                min="0"
                                disabled={loading}
                            />
                            {errors.minStock && (
                                <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>
                            )}
                        </div>

                        {/* Tồn kho tối đa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tồn kho tối đa <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={formData.maxStock}
                                onChange={(e) => handleInputChange("maxStock", e.target.value)}
                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                    errors.maxStock ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Nhập số lượng tối đa"
                                min="0"
                                disabled={loading}
                            />
                            {errors.maxStock && (
                                <p className="text-red-500 text-sm mt-1">{errors.maxStock}</p>
                            )}
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Nhập mô tả thuốc (tùy chọn)"
                            rows={3}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? "Đang thêm..." : "Thêm thuốc"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicineModal;
