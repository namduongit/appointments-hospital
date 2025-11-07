package com.appointmenthostpital.server.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appointmenthostpital.server.dtos.PaymentSend;
import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.dtos.VNPayResponse;
import com.appointmenthostpital.server.services.VNPayService;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payment")
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/payment-url")
    public ResponseEntity<RestResponse<VNPayResponse>> getPaymentUrl(
        @RequestBody PaymentSend order, 
        HttpServletRequest request, @RequestHeader("X-Request-Path") String requestFrom) {
        String paymentUrl = vnPayService.getPaymentUrl(order, request);
        System.out.println("Run here: " + paymentUrl);

        VNPayResponse vnPayResponse = new VNPayResponse();
        vnPayResponse.setPaymentUrl(paymentUrl);
        vnPayResponse.setRequestFrom(requestFrom);

        RestResponse<VNPayResponse> response = new RestResponse<>();
        response.setResult(true);
        response.setStatusCode(HttpStatusResponse.OK);
        response.setData(vnPayResponse);
        response.setMessage(HttpStatusResponse.SUCCESS_MESSAGE);
        response.setErrorMessage(null);

        return ResponseEntity.status(HttpStatusResponse.OK).body(response);
    }

    @GetMapping("/vnpay-return")
    public String hhh(@RequestParam Map<String, String> allParams) {
        System.out.println("Run here");
        return "OK";
    }
}