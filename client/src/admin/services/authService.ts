import { api, type RestResponse } from "../../api/api"

export const adminLogin = async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
        email: email,
        password: password
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const adminLogout = async () => {

}