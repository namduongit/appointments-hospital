import { createContext, useContext, useState, type ReactNode } from "react";

type DialogType = "success" | "error" | "warning" | "info" | "confirm";

interface DialogConfig {
    type: DialogType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    autoClose?: number; 
}

interface DialogContextType {
    isOpen: boolean;
    config: DialogConfig | null;
    showDialog: (config: DialogConfig) => void;
    closeDialog: () => void;
    showSuccess: (title: string, message: string, onConfirm?: () => void) => void;
    showError: (title: string, message: string, onConfirm?: () => void) => void;
    showWarning: (title: string, message: string, onConfirm?: () => void) => void;
    showInfo: (title: string, message: string, onConfirm?: () => void) => void;
    showConfirm: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};

interface DialogProviderProps {
    children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<DialogConfig | null>(null);

    const showDialog = (dialogConfig: DialogConfig) => {
        setConfig(dialogConfig);
        setIsOpen(true);
        
        // Auto close if specified
        if (dialogConfig.autoClose) {
            setTimeout(() => {
                closeDialog();
            }, dialogConfig.autoClose);
        }
    };

    const closeDialog = () => {
        setIsOpen(false);
        setTimeout(() => setConfig(null), 200); // Delay to allow animation
    };

    const showSuccess = (title: string, message: string, onConfirm?: () => void) => {
        showDialog({
            type: "success",
            title,
            message,
            confirmText: "Đóng",
            onConfirm: () => {
                onConfirm?.();
                closeDialog();
            }
        });
    };

    const showError = (title: string, message: string, onConfirm?: () => void) => {
        showDialog({
            type: "error",
            title,
            message,
            confirmText: "Đóng",
            onConfirm: () => {
                onConfirm?.();
                closeDialog();
            }
        });
    };

    const showWarning = (title: string, message: string, onConfirm?: () => void) => {
        showDialog({
            type: "warning",
            title,
            message,
            confirmText: "Đóng",
            onConfirm: () => {
                onConfirm?.();
                closeDialog();
            }
        });
    };

    const showInfo = (title: string, message: string, onConfirm?: () => void) => {
        showDialog({
            type: "info",
            title,
            message,
            confirmText: "Đóng",
            onConfirm: () => {
                onConfirm?.();
                closeDialog();
            }
        });
    };

    const showConfirm = (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
        showDialog({
            type: "confirm",
            title,
            message,
            confirmText: "Xác nhận",
            cancelText: "Hủy",
            onConfirm: () => {
                onConfirm();
                closeDialog();
            },
            onCancel: () => {
                onCancel?.();
                closeDialog();
            }
        });
    };

    const value: DialogContextType = {
        isOpen,
        config,
        showDialog,
        closeDialog,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showConfirm
    };

    return (
        <DialogContext.Provider value={value}>
            {children}
            {isOpen && config && <DialogComponent config={config} onClose={closeDialog} />}
        </DialogContext.Provider>
    );
};

interface DialogComponentProps {
    config: DialogConfig;
    onClose: () => void;
}

const DialogComponent = ({ config, onClose }: DialogComponentProps) => {
    const getDialogStyles = (type: DialogType) => {
        switch (type) {
            case "success":
                return {
                    bgColor: "bg-green-100",
                    iconBg: "bg-green-500",
                    buttonBg: "bg-green-500 hover:bg-green-600",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    )
                };
            case "error":
                return {
                    bgColor: "bg-red-100",
                    iconBg: "bg-red-500",
                    buttonBg: "bg-red-500 hover:bg-red-600",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )
                };
            case "warning":
                return {
                    bgColor: "bg-yellow-100",
                    iconBg: "bg-yellow-500",
                    buttonBg: "bg-yellow-500 hover:bg-yellow-600",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    )
                };
            case "info":
                return {
                    bgColor: "bg-blue-100",
                    iconBg: "bg-blue-500",
                    buttonBg: "bg-blue-500 hover:bg-blue-600",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    )
                };
            case "confirm":
                return {
                    bgColor: "bg-gray-100",
                    iconBg: "bg-gray-500",
                    buttonBg: "bg-blue-500 hover:bg-blue-600",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    )
                };
            default:
                return {
                    bgColor: "bg-gray-100",
                    iconBg: "bg-gray-500",
                    buttonBg: "bg-gray-500 hover:bg-gray-600",
                    icon: null
                };
        }
    };

    const styles = getDialogStyles(config.type);

    return (
        <div className="bg-black/50 fixed inset-0 z-[50] grid place-items-center animate-in fade-in duration-200">
            <div className="md:w-[50%] bg-white lg:w-[30%] rounded-xl p-6 flex flex-col items-center gap-6 animate-in zoom-in-95 duration-300">
                <div className={`${styles.bgColor} rounded-full p-6`}>
                    <div className={`${styles.iconBg} w-30 h-30 grid place-items-center rounded-full`}>
                        {styles.icon}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-2xl text-center">{config.title}</h3>
                </div>

                <div className="w-[80%] text-center">
                    <p className="font-normal text-lg text-gray-700">{config.message}</p>
                </div>

                <div className="flex gap-3">
                    {config.type === "confirm" ? (
                        <>
                            <button
                                className="px-6 py-3 bg-gray-200 rounded-xl text-gray-700 font-semibold transition cursor-pointer hover:bg-gray-300"
                                onClick={config.onCancel || onClose}
                            >
                                {config.cancelText || "Hủy"}
                            </button>
                            <button
                                className={`px-6 py-3 ${styles.buttonBg} rounded-xl text-white font-semibold transition cursor-pointer`}
                                onClick={config.onConfirm || onClose}
                            >
                                {config.confirmText || "Xác nhận"}
                            </button>
                        </>
                    ) : (
                        <button
                            className={`px-6 py-3 ${styles.buttonBg} rounded-xl text-white font-semibold transition cursor-pointer`}
                            onClick={config.onConfirm || onClose}
                        >
                            {config.confirmText || "Đóng"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DialogProvider;
