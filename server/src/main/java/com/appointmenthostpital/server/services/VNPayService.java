package com.appointmenthostpital.server.services;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appointmenthostpital.server.configs.VNPayConfig;
import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.models.PrescriptionInvoiceModel;
import com.appointmenthostpital.server.models.ServiceInvoiceModel;
import com.appointmenthostpital.server.utils.VNPay;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class VNPayService extends VNPayConfig {

    @Autowired
    private ServiceInvoiceService serviceInvoiceService;

    @Autowired
    private PrescriptionInvoiceService prescriptionInvoiceService;

    /**
     * String bankCode = req.getParameter("bankCode"); Optional
     * if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
     * 
     * @param order
     * @param request
     * @return paymentUrl: String
     * 
     * transactionReference: Unique order code in VNPay system
     */

    public String getPaymentUrl(PaymentSend order, HttpServletRequest request) {
        String version = "2.1.0";
        String command = "pay";
        String orderType = "other";
        Long totalAmount = 0L;
        String orderRequestType = order.getOrderType();
        if (orderRequestType.equals("service_invoice")) {
            ServiceInvoiceModel serviceInvoice = serviceInvoiceService.getServiceInvoiceById(order.getOrderId());
            totalAmount = serviceInvoice.getTotalAmount() * 100L;

        } else if (orderRequestType.equals("prescription_invoice")) {
            PrescriptionInvoiceModel prescriptionInvoice = prescriptionInvoiceService.getPrescriptionInvoiceById(order.getOrderId());
            totalAmount = prescriptionInvoice.getTotalAmount() * 100L;
        } else {
            throw new IllegalArgumentException("Lỗi tạo hóa đơn do sai loại");
        }

        String transactionReference = VNPay.getRandomNumber(8);             
        String clientIpRequest = VNPay.getIpAddress(request);

        String terminalCode = this.getTerminalCode();

        Map<String, String> vnpayParams = new HashMap<>();
        vnpayParams.put("vnp_Version", version);
        vnpayParams.put("vnp_Command", command);
        vnpayParams.put("vnp_TmnCode", terminalCode);

        vnpayParams.put("vnp_Amount", String.valueOf(totalAmount));
        vnpayParams.put("vnp_CurrCode", "VND");
        vnpayParams.put("vnp_TxnRef", transactionReference);
        vnpayParams.put("vnp_OrderInfo", orderRequestType);
        vnpayParams.put("vnp_OrderType", orderType);
        vnpayParams.put("vnp_Locale", "vn");
        vnpayParams.put("vnp_ReturnUrl", this.getReturnUrl());
        vnpayParams.put("vnp_IpAddr", clientIpRequest);

        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String createDate = formatter.format(calendar.getTime());
        vnpayParams.put("vnp_CreateDate", createDate);

        calendar.add(Calendar.MINUTE, 15);

        String expirationDate = formatter.format(calendar.getTime());
        vnpayParams.put("vnp_ExpireDate", expirationDate);

        List<String> sortedFields = new ArrayList<>(vnpayParams.keySet());
        Collections.sort(sortedFields);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> iterator = sortedFields.iterator(); iterator.hasNext();) {
            String fieldName = iterator.next();
            String fieldValue = vnpayParams.get(fieldName);

            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                if (iterator.hasNext()) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }

        String secureHash = VNPay.hmacSHA512(this.getSecretKey(), hashData.toString());
        query.append("&vnp_SecureHash=");
        query.append(secureHash);
        String paymentUrl = this.getUrlPayment() + "?" + query.toString();

        return paymentUrl;
    }
}
