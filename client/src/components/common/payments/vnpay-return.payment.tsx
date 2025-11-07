import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const VNPayReturnPayment = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({
        amount: '',
        bankCode: '',
        bankTranNo: '',
        cardType: '',
        orderInfo: '',
        payDate: '',
        responseCode: '',
        tmnCode: '',
        transactionNo: '',
        transactionStatus: '',
        txnRef: '',
        secureHash: ''
    });

    useEffect(() => {
        // Đọc tất cả các tham số từ URL
        const info = {
            amount: searchParams.get('vnp_Amount') || '',
            bankCode: searchParams.get('vnp_BankCode') || '',
            bankTranNo: searchParams.get('vnp_BankTranNo') || '',
            cardType: searchParams.get('vnp_CardType') || '',
            orderInfo: searchParams.get('vnp_OrderInfo') || '',
            payDate: searchParams.get('vnp_PayDate') || '',
            responseCode: searchParams.get('vnp_ResponseCode') || '',
            tmnCode: searchParams.get('vnp_TmnCode') || '',
            transactionNo: searchParams.get('vnp_TransactionNo') || '',
            transactionStatus: searchParams.get('vnp_TransactionStatus') || '',
            txnRef: searchParams.get('vnp_TxnRef') || '',
            secureHash: searchParams.get('vnp_SecureHash') || ''
        };

        setPaymentInfo(info);

        // Log để kiểm tra
        console.log('VNPay Payment Info:', info);

        // Kiểm tra trạng thái thanh toán
        if (info.responseCode === '00' && info.transactionStatus === '00') {
            console.log('Thanh toán thành công!');
        } else {
            console.log('Thanh toán thất bại!');
        }
    }, [searchParams]);

    return (
        <div className="payment-return-container p-6">
            <h2 className="text-2xl font-bold mb-4">Kết quả thanh toán VNPay</h2>
            
            {paymentInfo.responseCode === '00' && paymentInfo.transactionStatus === '00' ? (
                <div className="success-message bg-green-100 p-4 rounded mb-4">
                    <h3 className="text-green-800 font-semibold">✓ Thanh toán thành công!</h3>
                </div>
            ) : (
                <div className="error-message bg-red-100 p-4 rounded mb-4">
                    <h3 className="text-red-800 font-semibold">✗ Thanh toán thất bại!</h3>
                </div>
            )}

            <div className="payment-details bg-white shadow rounded p-4">
                <h3 className="font-semibold mb-3">Chi tiết giao dịch:</h3>
                <div className="space-y-2">
                    <p><strong>Số tiền:</strong> {(parseInt(paymentInfo.amount) / 100).toLocaleString('vi-VN')} VND</p>
                    <p><strong>Mã đơn hàng:</strong> {paymentInfo.txnRef}</p>
                    <p><strong>Thông tin đơn hàng:</strong> {decodeURIComponent(paymentInfo.orderInfo)}</p>
                    <p><strong>Mã giao dịch:</strong> {paymentInfo.transactionNo}</p>
                    <p><strong>Ngân hàng:</strong> {paymentInfo.bankCode}</p>
                    <p><strong>Loại thẻ:</strong> {paymentInfo.cardType}</p>
                    <p><strong>Ngày thanh toán:</strong> {paymentInfo.payDate}</p>
                    <p><strong>Mã phản hồi:</strong> {paymentInfo.responseCode}</p>
                    <p><strong>Trạng thái:</strong> {paymentInfo.transactionStatus}</p>
                </div>
            </div>
        </div>
    )
}

export default VNPayReturnPayment;