import React from "react";
import { css } from "@styled-system/css";
import Import from './Import';
import Export from './Export';
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    const theme = useTheme();
    async function onAfterImport() {
    }
    return <div css={css(theme.divs.commonPage)}>
        <section css={css(theme.sections.common)}>
            <h2>Экспорт-импорт в локальный файл</h2>
            <form css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}>
                <Export />
                <Import onAfterImport={onAfterImport} />
            </form>
        </section>
    </div>;
}

export { Page };
