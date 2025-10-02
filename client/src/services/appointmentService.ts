import { api, type RestResponse } from "../api/api"

export const createAppointment = async (fullName: string, phone: string, date: string, time: string, note: string) => {
    const response = await api.post("/api/user/appointments", {
        fullName: fullName,
        phone: phone,
        date: date,
        time: time,
        note: note
    });

    const restResponse: RestResponse = response.data;
    return restResponse;
};