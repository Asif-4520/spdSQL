import { useEffect } from "react";
import { SettingsContent } from "../components/SettingsModal";
import { useSettingsStore } from "../store";

export default function Settings() {
    const { setIsSettingsOpen } = useSettingsStore();

    useEffect(() => {
        setIsSettingsOpen(false);
    }, [setIsSettingsOpen]);

    return (
        <div className="max-w-2xl h-full mx-auto  overflow-y-scroll">
            <SettingsContent />
        </div>
    );
}
