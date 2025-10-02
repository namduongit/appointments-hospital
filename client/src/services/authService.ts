import { api } from "../api/api"
import type { RestResponse } from "../api/api"

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
        email: email,
        password: password
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const register = async (email: string, password: string, passwordConfirm: string) => {
    const response = await api.post("/auth/register", {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const valid = async() => {
    const response = await api.post("/auth/authConfig")
    const restResponse: RestResponse = response.data;
    return restResponse;
}

