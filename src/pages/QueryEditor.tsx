import Split from "../components/Split";
import Editor from "../components/Editor/Editor";
import Result from "../components/Result";
import { useSettingsStore } from "../store";

function QueryEditor() {
    const { isVertical } = useSettingsStore();
    return (
        <Split direction={isVertical ? "column" : "row"}>
            <Editor />
            <Result />
        </Split>
    );
}

export default QueryEditor;
