import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import type { AppointmentResponse } from "../../../responses/appointment.response";
import type { MedicalPackage } from "../../../models/MedicalPackage.model";
import { getMedicalPackageList } from "../../../services/medical-package.service";
import { updateAppointment } from "../../../services/appointment.service";
import { formatNumberPhone } from "../../../utils/formatNumber.util";
import { formatDateVi } from "../../../utils/formatDate.util";
import useCallApi from "../../../hooks/useCallApi";

interface ExaminationForm {
    appointmentId: number;
    patientName: string;
    patientPhone: string;
    symptoms: string;
    diagnosis: string;
    notes: string;
    selectedPackages: MedicalPackage[];
    totalAmount: number;
}

const DoctorExaminationPage = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { execute, notify, doFunc } = useCallApi();

    const [appointmentData, setAppointmentData] = useState<AppointmentResponse | null>(null);
    const [medicalPackages, setMedicalPackages] = useState<MedicalPackage[]>([]);
    const [filteredPackages, setFilteredPackages] = useState<MedicalPackage[]>([]);
    const [searchPackage, setSearchPackage] = useState("");

    const [examinationForm, setExaminationForm] = useState<ExaminationForm>({
        appointmentId: 0,
        patientName: "",
        patientPhone: "",
        symptoms: "",
        diagnosis: "",
        notes: "",
        selectedPackages: [],
        totalAmount: 0
    });

    const handleGetMedicalPackages = async () => {
        const restResponse = await execute(getMedicalPackageList());
        doFunc(() => {
            if (restResponse?.result) {
                const data: MedicalPackage[] = restResponse.data;
                setMedicalPackages(Array.isArray(data) ? data : []);
                setFilteredPackages(Array.isArray(data) ? data : []);
            }
        });
    };

    const handleSearchPackages = (searchTerm: string) => {
        setSearchPackage(searchTerm);
        if (searchTerm === "") {
            setFilteredPackages(medicalPackages);
        } else {
            const filtered = medicalPackages.filter(pkg =>
                pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPackages(filtered);
        }
    };

    const handleAddPackage = (medicalPackage: MedicalPackage) => {
        if (!examinationForm.selectedPackages.some(pkg => pkg.id === medicalPackage.id)) {
            const updatedPackages = [...examinationForm.selectedPackages, medicalPackage];
            const newTotal = updatedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
            
            setExaminationForm(prev => ({
                ...prev,
                selectedPackages: updatedPackages,
                totalAmount: newTotal
            }));
        }
    };

    const handleRemovePackage = (packageId: number) => {
        const updatedPackages = examinationForm.selectedPackages.filter(pkg => pkg.id !== packageId);
        const newTotal = updatedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
        
        setExaminationForm(prev => ({
            ...prev,
            selectedPackages: updatedPackages,
            totalAmount: newTotal
        }));
    };

    const handleFormChange = (field: keyof ExaminationForm, value: string) => {
        setExaminationForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCompleteExamination = async () => {
        try {
            // Update appointment status to COMPLETED
            const restResponse = await execute(updateAppointment(Number(appointmentId), { status: "COMPLETED" }));
            
            doFunc(() => {
                notify(restResponse!, "Hoàn thành khám bệnh thành công");
                // Redirect back to appointments page
                navigate("/doctor/appointment");
            });
        } catch (error) {
            console.error("Error completing examination:", error);
        }
    };

    useEffect(() => {
        if (location.state?.appointmentData) {
            const appointment = location.state.appointmentData as AppointmentResponse;
            setAppointmentData(appointment);
            setExaminationForm(prev => ({
                ...prev,
                appointmentId: appointment.id,
                patientName: appointment.fullName,
                patientPhone: appointment.phone
            }));
        }
        handleGetMedicalPackages();
    }, [location.state]);

    if (!appointmentData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
                    <p className="text-gray-600">Đang tải thông tin...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="examination-page p-4 sm:p-6">
            <div className="examination-page__wrap max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                        Phiếu khám bệnh
                    </h3>
                    <button
                        onClick={() => navigate("/doctor/appointment")}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        Quay lại
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-user-injured mr-2 text-blue-600"></i>
                                Thông tin bệnh nhân
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mã phiếu hẹn
                                    </label>
                                    <input
                                        type="text"
                                        value={`#${appointmentData.id}`}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm bg-gray-50"
                                        disabled
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Thời gian hẹn
                                    </label>
                                    <input
                                        type="text"
                                        value={appointmentData.time}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm bg-gray-50"
                                        disabled
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tên bệnh nhân
                                    </label>
                                    <input
                                        type="text"
                                        value={examinationForm.patientName}
                                        onChange={(e) => handleFormChange("patientName", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        value={formatNumberPhone(examinationForm.patientPhone)}
                                        onChange={(e) => handleFormChange("patientPhone", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-stethoscope mr-2 text-blue-600"></i>
                                Thông tin khám bệnh
                            </h4>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Triệu chứng
                                    </label>
                                    <textarea
                                        value={examinationForm.symptoms}
                                        onChange={(e) => handleFormChange("symptoms", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        placeholder="Mô tả triệu chứng của bệnh nhân..."
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Chẩn đoán
                                    </label>
                                    <textarea
                                        value={examinationForm.diagnosis}
                                        onChange={(e) => handleFormChange("diagnosis", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        placeholder="Kết quả chẩn đoán..."
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={examinationForm.notes}
                                        onChange={(e) => handleFormChange("notes", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        placeholder="Ghi chú thêm..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-medical-kit mr-2 text-blue-600"></i>
                                Chọn gói khám
                            </h4>
                            
                            <div className="relative mb-4">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchPackage}
                                    onChange={(e) => handleSearchPackages(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tìm kiếm gói khám..."
                                />
                            </div>
                            
                            <div className="max-h-60 overflow-y-auto space-y-2">
                                {filteredPackages.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">{pkg.name}</h5>
                                            <p className="text-sm text-gray-600">{pkg.description}</p>
                                            <p className="text-sm font-semibold text-blue-600">
                                                {pkg.price.toLocaleString('vi-VN')} ₫
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAddPackage(pkg)}
                                            disabled={examinationForm.selectedPackages.some(selected => selected.id === pkg.id)}
                                            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i className="fa-solid fa-plus mr-1"></i>
                                            Thêm
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-receipt mr-2 text-blue-600"></i>
                                Hóa đơn khám bệnh
                            </h4>
                            
                            <div className="space-y-3 mb-4">
                                {examinationForm.selectedPackages.length > 0 ? (
                                    examinationForm.selectedPackages.map((pkg) => (
                                        <div key={pkg.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                                            <div className="flex-1">
                                                <h6 className="font-medium text-gray-900">{pkg.name}</h6>
                                                <p className="text-sm text-gray-600">{pkg.description}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-blue-600">
                                                    {pkg.price.toLocaleString('vi-VN')} ₫
                                                </span>
                                                <button
                                                    onClick={() => handleRemovePackage(pkg.id)}
                                                    className="text-red-600 hover:text-red-700 transition-colors"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fa-solid fa-medical-kit text-3xl mb-2"></i>
                                        <p>Chưa chọn gói khám nào</p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {examinationForm.totalAmount.toLocaleString('vi-VN')} ₫
                                    </span>
                                </div>
                                
                                <button
                                    onClick={handleCompleteExamination}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                                >
                                    <i className="fa-solid fa-check mr-2"></i>
                                    Hoàn thành khám bệnh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DoctorExaminationPage;
