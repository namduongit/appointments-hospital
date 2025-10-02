import type { AccountDetail } from "../../../constants/dtos.constant";
import { roles } from "../../../constants/role.constant";
import { actives } from "../../../constants/status.constant";
import { useEffect, useState } from "react";
import { getAccountList } from "../../services/accountService";
import AdminAccountTable from "../../components/tables/account.table";
import AddAccountModal from "../../components/modals/addAccount.modal";
import { useAsyncHandler } from "../../../hooks/useAsyncHandler";

const AdminAccountsPage = () => {
    const { execute } = useAsyncHandler();

    const [accounts, setAccounts] = useState<AccountDetail[]>([]);
    const [accountFilter, setAccountFilter] = useState<AccountDetail[]>([]);

    const [isOpenCreateAccount, setIsOpenCreateAccount] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        role: "",
        status: ""
    });

    const handleGetAccountList = async () => {
        await execute(async () => {
            const restResponse = await getAccountList();
            if (restResponse.result) {
                const data: AccountDetail[] = restResponse.data;
                setAccounts(Array.isArray(data) ? data : []);
                setAccountFilter(Array.isArray(data) ? data : []);
            }
        });
    }

    const handleRefreshData = () => {
        handleGetAccountList();
    }

    const handleSearchFormChange = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    useEffect(() => {
        handleGetAccountList();
    }, []);

    useEffect(() => {
        setAccountFilter(
            accounts.filter(account => {
                const matchesInput =
                    searchForm.input === "" ||
                    account.email?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                    account.id?.toString().includes(searchForm.input);

                const matchesRole =
                    searchForm.role === "" || account.role === searchForm.role;

                const matchesStatus =
                    searchForm.status === "" || account.status === searchForm.status;

                return matchesInput && matchesRole && matchesStatus;
            })
        );
    }, [searchForm, accounts]);

    return (
        <main className="accounts-page p-4 sm:p-6">
            <div className="accounts-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý tài khoản
                    </h3>
                    <div className="text-sm text-gray-600">
                        Tổng: <span className="font-semibold text-blue-600">{accounts.length}</span> tài khoản
                    </div>
                </div>

                <div className="accounts__sort bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="accounts__filter flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="accounts__filter__item relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                onChange={(event) => handleSearchFormChange("input", event.target.value)}
                                type="text"
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm theo tên tài khoản hoặc id ..."
                            />
                        </div>

                        <div className="accounts__filter__item flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.role}
                                onChange={(event) => handleSearchFormChange("role", event.target.value)}
                            >
                                <option value="">Chọn quyền</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.value}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="accounts__filter__item flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(event) => handleSearchFormChange("status", event.target.value)}                            >
                                <option value="">Chọn trạng thái</option>
                                {actives.map((active) => (
                                    <option key={active.id} value={active.value}>
                                        {active.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="accounts__options flex justify-end items-center">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateAccount(true)}>
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm tài khoản</span>
                        </button>
                    </div>
                </div>

                <div className="accounts__data hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <AdminAccountTable accounts={accountFilter} onRefreshData={handleRefreshData} />
                    </div>
                </div>
            </div>

            {isOpenCreateAccount && (
                <AddAccountModal 
                    isOpenCreateAccount={isOpenCreateAccount} 
                    setIsOpenCreateAccount={setIsOpenCreateAccount}
                    onSuccess={handleRefreshData}
                />
            )}

        </main >
    )
}

export default AdminAccountsPage;
