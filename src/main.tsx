import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routes/routes";
import { AppProviders } from "./providers/providers";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then(() => {})
            .catch((err) => {
                console.error("SW failed:", err);
            });
    });
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
    });
}

if (rootElement) {
    createRoot(rootElement).render(
        <AppProviders>
            <AppRouter />
            <Toaster />
        </AppProviders>
    );
}
