import type { AccountDetail } from "../../../constants/dtos.constant";
import { motion } from "motion/react";

type AdminAccountDetail = {
    accountSelect: AccountDetail,
    setShowDetail: (showDetail: boolean) => void
}

const AdminAccountDetail = (props: AdminAccountDetail) => {
    const account = props.accountSelect;

    const getStatusColor = (status: string) => {
        return status === 'ACTIVE' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'text-purple-600 bg-purple-100';
            case 'DOCTOR': return 'text-blue-600 bg-blue-100';
            case 'CASHIER': return 'text-orange-600 bg-orange-100';
            case 'USER': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

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
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => props.setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="admin-detail__header flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="admin-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="admin-detail__tag font-bold">
                            <p>ID tài khoản: <span># {account.id}</span></p>
                            <p>Trạng thái: <span className={`px-2 py-1 rounded text-xs ${getStatusColor(account.status)}`}>{account.status === 'INACTIVE' ? 'Bị khóa' : ' Đang hoạt động'}</span></p>
                        </div>
                    </div>

                    <div className="admin-detail__body px-5 py-5 flex flex-col gap-5">
                        <div className="admin-detail__list flex flex-col gap-5">
                            <div className="admin-detail__item px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-indigo-600 text-lg"></i>
                                    <span>Thông tin tài khoản</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Email: <span className="text-black">{account.email}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Vai trò: <span className={`px-2 py-1 font-semibold ${getRoleColor(account.role)}`}>
                                        {account.role === 'ADMIN' ? 'Quản trị viên' :
                                            account.role === 'DOCTOR' ? 'Bác sĩ' :
                                                account.role === 'ASSISTOR' ? 'Nhân viên' : 'Khách hàng'}
                                    </span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Loại tài khoản: <span className="text-black">{account.type === 'ACCOUNT' ? 'Tài khoản' : 'Email'}</span>
                                </p>
                            </div>

                            {account.userProfileModel && (
                                <div className="admin-detail__item border-1 border-gray-300 px-3 py-3 bg-white rounded shadow">
                                    <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                        <i className="fa-solid fa-address-card text-blue-600 text-lg"></i>
                                        <span>Thông tin cá nhân</span>
                                    </div>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Họ tên: <span className="text-black">{account.userProfileModel.fullName || 'Chưa cập nhật'}</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Số điện thoại: <span className="text-black">{account.userProfileModel.phone || 'Chưa cập nhật'}</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Địa chỉ: <span className="text-black">{account.userProfileModel.address || 'Chưa cập nhật'}</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Ngày sinh: <span className="text-black">{account.userProfileModel.birthDate || 'Chưa cập nhật'}</span>
                                    </p>
                                </div>
                            )}

                            {account.userAppointmets && account.userAppointmets.length > 0 && (
                                <div className="admin-detail__item border-1 border-blue-300 px-3 py-3 bg-blue-50 rounded shadow">
                                    <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                        <i className="fa-solid fa-calendar-check text-blue-600 text-lg"></i>
                                        <span>Lịch hẹn</span>
                                    </div>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Tổng số lịch hẹn: <span className="text-black">{account.userAppointmets.length}</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600 font-medium mb-1">
                                        Lịch hẹn gần nhất: <span className="text-black">
                                            {account.userAppointmets.length > 0
                                                ? new Date(account.userAppointmets[0].time).toLocaleDateString('vi-VN')
                                                : 'Không có'
                                            }
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="admin-detail__button flex gap-2">
                            <button className="w-full px-3 py-2 rounded font-bold text-white bg-blue-600 hover:bg-blue-700 shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
                            >
                                Đổi mật khẩu
                            </button>

                            <button className="w-full px-3 py-2 rounded font-bold text-white bg-red-600 hover:bg-red-700 shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
                            >
                                Xóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AdminAccountDetail;
