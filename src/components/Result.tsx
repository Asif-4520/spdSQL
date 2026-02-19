import { useStateContext } from "../context/GlobalContext";
import { useSettingsStore } from "../store";
import type { QueryResult as DuckQueryResult, QueryResponse } from "../lib/db";
import {
    DataTable,
    EmptyBox,
    NoRows,
    SuccessBox,
    ErrorBox,
} from "./Result/index";

interface ResultProps {
    response?: QueryResponse | null;
}

export default function Result({ response }: ResultProps) {
    const context = useStateContext();
    const { resolvedTheme, fontSize } = useSettingsStore();

    const error = response ? response.error : context.QueryError;
    const data = response ? response.data : context.QueryResult;

    if (error) {
        return <ErrorBox error={error} resolvedTheme={resolvedTheme} />;
    }

    if (!data?.length) {
        return <EmptyBox />;
    }

    const [firstResult] = data as DuckQueryResult[];
    const columns = firstResult?.columns ?? [];
    const values = firstResult?.values ?? [];
    const { statementType, affectedRows } = firstResult ?? {};

    if (columns?.length && values?.length) {
        return (
            <DataTable columns={columns} values={values} fontSize={fontSize} />
        );
    }

    if (statementType) {
        const selectTypes = ["SELECT", "SHOW", "DESCRIBE", "EXPLAIN", "PRAGMA"];
        if (selectTypes.includes(statementType)) {
            return <NoRows />;
        }
        return <SuccessBox type={statementType} rows={affectedRows} />;
    }

    return columns?.length ? <NoRows /> : <EmptyBox />;
}
