import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#0d9260",
                color: "#fff",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                borderRadius: "10px",
              },
            }}
          />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);