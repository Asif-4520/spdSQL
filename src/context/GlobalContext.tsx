import { createContext, useContext } from "react";
import type { GlobalContextState, GlobalContextProviderProps } from "./types";
import { useGlobalState } from "./use-global-state";

const Context = createContext<GlobalContextState | null>(null);

function GlobalContext({ children }: GlobalContextProviderProps) {
    const state = useGlobalState();

    return <Context.Provider value={state}>{children}</Context.Provider>;
}

export const useStateContext = () => {
    const ctx = useContext(Context);
    if (!ctx) {
        throw new Error("useStateContext must be used in provider");
    }
    return ctx;
};

export default GlobalContext;
