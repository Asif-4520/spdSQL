import React from "react";
import GlobalContext from "../context/GlobalContext";
import { SettingsProvider } from "../store";

interface AppProvidersProps {
    children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <SettingsProvider>
            <GlobalContext>{children}</GlobalContext>
        </SettingsProvider>
    );
}
