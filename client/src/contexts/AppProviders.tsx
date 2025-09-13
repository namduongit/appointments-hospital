import { ToastProvider } from "./toastContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
      <ToastProvider>
        {children}
      </ToastProvider>
  );
};


/**

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./AppProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);


*/