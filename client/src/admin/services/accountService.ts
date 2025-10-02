import { api, type RestResponse } from "../../api/api"

export const getAccountList = async () => {
    const response = await api.get("/api/admin/accounts");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const createAccount = async (email: string, password: string, passwordConfirm: string, role: string) => {
    const response = await api.post("/api/admin/accounts", {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        role: role
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const deleteAccount = async (id: number) => {
    const response = await api.delete(`/api/admin/accounts/${id}`);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateAccount = async(id: number, user: {
    email?: string,
    password?: string,
    role?: string,
    type?: string,
    status?: string
}) => {
    const response = await api.put(`/api/admin/accounts/${id}`, user);
    const restResponse: RestResponse = response.data;
    return restResponse;
}