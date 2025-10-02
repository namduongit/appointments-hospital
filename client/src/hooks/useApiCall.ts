import { useToast } from "../contexts/toastContext";

interface ApiCall {
    successMessage?: string;
    errorMessage?: string;
    showLoading?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

export const useApiCall = () => {
    const toast = useToast();

    const callApi = async <T>(apiFunction: () => Promise<T>, options: ApiCall = {}): Promise<{ data: T | null; success: boolean }> => {
        const {
            successMessage,
            errorMessage = "Có lỗi xảy ra",
            onSuccess,
            onError
        } = options;

        try {
            const response = await apiFunction();
            
            const isSuccess = (response as any)?.result === true || 
                             (response as any)?.statusCode === 200 ||
                             (response as any)?.statusCode === 201;

            if (isSuccess) {
                if (successMessage) {
                    toast.showToast("Thành công", successMessage, "success");
                }
                onSuccess?.(response);
                return { data: response, success: true };
            } else {
                const apiError = (response as any)?.errorMessage || 
                               (response as any)?.message || 
                               errorMessage;
                
                if (Array.isArray(apiError)) {
                    apiError.forEach((error: string) => {
                        toast.showToast("Lỗi", error, "error");
                    });
                } else {
                    toast.showToast("Lỗi", apiError, "error");
                }
                
                onError?.(response);
                return { data: null, success: false };
            }
        } catch (error: any) {
            console.error("API Call Error:", error);
            
            const errorMsg = error?.response?.data?.message || 
                           error?.response?.data?.errorMessage || 
                           error?.message || 
                           errorMessage;
            
            toast.showToast("Lỗi", errorMsg, "error");
            onError?.(error);
            
            return { data: null, success: false };
        }
    };

    return { callApi };
};
