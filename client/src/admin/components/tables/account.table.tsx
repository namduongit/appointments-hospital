import { useState } from "react";
import type { AccountDetail } from "../../../constants/dtos.constant"
import { deleteAccount, updateAccount } from "../../services/accountService"
import AdminTablePagination from "../paginations/table.pagination";
import { useAsyncHandler } from "../../../hooks/useAsyncHandler";
import AdminAccountDetail from "../details/account.detail";

type AdminAccountTable = {
    accounts: AccountDetail[];
    onRefreshData?: () => void;
}

const AdminAccountTable = (props: AdminAccountTable) => {
    const { execute } = useAsyncHandler();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [accountSelect, setAccountSelect] = useState<AccountDetail>({} as AccountDetail);

    const handleShow = (accountSelect: AccountDetail) => {
        setAccountSelect(accountSelect);
        setShowDetail(true);
    }

    const handleDelete = async (id: number) => {
        await execute(
            () => deleteAccount(id),
            {
                successMessage: "Xóa tài khoản thành công",
                onSuccess: props.onRefreshData
            }
        )
    }

    const handleUpdate = async (id: number, user: {
        email?: string,
        password?: string,
        role?: string,
        type?: string,
        status?: string
    }) => {
        await execute(
            () => updateAccount(id, user),
            {
                successMessage: user.status === "INACTIVE" ? "Khóa tài khoản thành công" : "Mở khóa tài khoản thành công",
                onSuccess: props.onRefreshData
            }
        );
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tài khoản</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quyền hạn</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(props.accounts && props.accounts.length > 0) ? props.accounts.slice((page - 1) * row, page * row).map((account, idx) => (
                        <tr key={account.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">#{account.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">{account.email}</td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                                                            ${account.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                                            ${account.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : ''}
                                                                        `}>
                                    {account.status === 'INACTIVE' ? 'Bị khóa' : 'Họat động'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                {account.role === 'ADMIN' ? 'Quản trị viên' :
                                    account.role === 'DOCTOR' ? 'Bác sĩ' :
                                        account.role === 'ASSISTOR' ? 'Nhân viên' : 'Khách hàng'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShow(account)}
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>

                                    {account.status === "ACTIVE" ? (
                                        <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                            onClick={() => {
                                                handleUpdate(account.id, { status: "INACTIVE" })
                                            }}
                                        >
                                            <i className="fa-solid fa-lock"></i>
                                        </button>
                                    ) : (
                                        <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                            onClick={() => {
                                                handleUpdate(account.id, { status: "ACTIVE" })
                                            }}>
                                            <i className="fa-solid fa-lock-open"></i>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <>
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-sm text-gray-600 text-center">
                                    <div className="flex justify-center items-center gap-3">
                                        <i className="fa-solid fa-inbox"></i>
                                        <span>Không tìm thấy dữ liệu</span>
                                    </div>
                                </td>
                            </tr>
                        </>)}
                </tbody>
            </table>
            <AdminTablePagination array={props.accounts} page={page} row={row} setPage={setPage} setRow={setRow} />
            {(accountSelect && showDetail) && (<AdminAccountDetail accountSelect={accountSelect} setShowDetail={setShowDetail}  />)}
        </>
    )
}

export default AdminAccountTable;