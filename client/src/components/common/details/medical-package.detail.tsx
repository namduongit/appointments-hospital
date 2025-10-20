import { motion } from "motion/react";
import type { MedicalPackageResponse } from "../../../responses/medical-package.response";

type MedicalPackageDetail = {
    medicalPackageSelect: MedicalPackageResponse,
    setShowDetail: (showDetail: boolean) => void
}

const MedicalPackageDetail = (props: MedicalPackageDetail) => {
    const { medicalPackageSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
            status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    status === 'CANCELED' ? '' : 'bg-red-100 text-red-700';
    }

    return (
        <div className="admin-detail-account fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
            <motion.div
                initial={{
                    x: 650
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className="admin-detail__wrap fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="admin-detail__content relative">
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="admin-detail__header flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="admin-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="admin-detail__tag font-bold">
                            <p className="flex gap-2">ID gói dịch vụ:
                                <span># {medicalPackageSelect.id}</span>
                            </p>
                            <p className="flex gap-2">Trạng thái:
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(medicalPackageSelect.status)}`}>
                                    {medicalPackageSelect.status === 'INACTIVE' ? 'Dừng hoạt động' : ''}
                                    {medicalPackageSelect.status === 'ACTIVE' ? 'Họat động' : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </div >
            </motion.div >
        </div >
    )
}

export default MedicalPackageDetail;
