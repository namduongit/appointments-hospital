import { useState } from "react";
import { useToast } from "../contexts/toastContext";
import type { RestResponse } from "../api/api";

interface AsyncHandler {
    loadingState?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
    onFinally?: () => void;
}

export const useAsyncHandler = () => {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const execute = async <T>(asyncFn: () => Promise<T>, options: AsyncHandler = {}): Promise<T | null> => {
        const {
            loadingState = true,
            successMessage,
            errorMessage = "Có lỗi xảy ra",
            onSuccess,
            onError,
            onFinally
        } = options;

        try {
            if (loadingState) setLoading(true);
            const resultRequest = await asyncFn();
            // Because, page or component handled response
            if (resultRequest) {
                const restResponse = resultRequest as unknown as RestResponse;
                const isSuccess = restResponse.result === true && (restResponse.statusCode === 200 || restResponse.statusCode === 201);
                
                if (isSuccess) {
                    if (successMessage) {
                        toast.showToast("Thành công", successMessage, "success");
                    }
                    onSuccess?.();
                    return resultRequest;
                } else {
                    const apiError = restResponse?.errorMessage || restResponse?.message;
                    if (apiError) {
                        if (Array.isArray(apiError)) {
                            apiError.forEach((error: string) => {
                                toast.showToast("Lỗi", error, "error");
                            });
                        } else {
                            toast.showToast("Lỗi", apiError, "error");
                        }
                    } else {
                        toast.showToast("Lỗi", errorMessage, "error");
                    }
                    onError?.(restResponse);
                    return null;
                }
            }
            
            return null; 

        } catch (error: any) {
            console.error("AsyncHandler Error:", error);

            const errorMsg = error?.response?.data?.message ||
                error?.response?.data?.errorMessage ||
                error?.message ||
                errorMessage;

            if (Array.isArray(errorMsg)) {
                errorMsg.forEach((msg: string) => {
                    toast.showToast("Lỗi", msg, "error");
                });
            } else {
                toast.showToast("Lỗi", errorMsg, "error");
            }

            onError?.(error);
            return null;

        } finally {
            if (loadingState) setLoading(false);
            onFinally?.();
        }
    };

return { execute, loading };
};

export const handleApiResponse = (
    response: any,
    successCallback?: () => void,
    errorCallback?: (error: string | string[]) => void
) => {
    if (response?.result === true) {
        successCallback?.();
        return true;
    } else {
        const errorMessage = response?.errorMessage || response?.message || "Có lỗi xảy ra";
        errorCallback?.(errorMessage);
        return false;
    }
};
