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
        <h2>Экспорт-импорт в локальный файл</h2>
        <section css={css(theme.sections.common)}>
            <h3>Экспорт</h3>
            <Export />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Импорт</h3>
            <Import onAfterImport={onAfterImport} />
        </section>
    </div>;
}

export { Page };
