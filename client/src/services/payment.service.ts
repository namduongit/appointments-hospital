import { api, type RestResponse } from "../api/api"

export const callPayment = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}   

type PaymentParams = {
    orderType: string,
    orderId: number
}