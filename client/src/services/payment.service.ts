import { api, type RestResponse } from "../api/api"

export const callServiceInvoicePayment = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/service-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}   

export const callPrescriptionInvoicePayment = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/prescription-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const checkPaymentInvoice = async (params: PaymentCheckParams) => {
    const response = await api.post('/api/payment/valid/check-payment', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

type PaymentParams = {
    orderType: "SERVICE INVOICE" | "PRESCRIPTION INVOICE",
    orderId: number
}

type PaymentCheckParams = {
    amount: string,
    bankCode: string,
    bankTranNo: string,
    cardType: string,
    orderInfo: string,
    payDate: string,
    responseCode: string,
    tmnCode: string,
    transactionNo: string,
    transactionStatus: string,
    txnRef: string,
    secureHash: string
}