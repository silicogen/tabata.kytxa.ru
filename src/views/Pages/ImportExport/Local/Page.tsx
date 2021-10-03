import React from "react";
import { css } from "utils";
// import 'styled-components/macro';
import Import from './Import';
import Export from './Export';
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    const theme = useTheme();
    async function onAfterImport() {
    }
    return <div css={css(theme.divs.commonPage)}>
        <section css={css(theme.sections.common)}>
            <h2>Экспорт</h2>
            <Export />
        </section>
        <section css={css(theme.sections.common)}>
            <h2>Импорт</h2>
            <Import onAfterImport={onAfterImport} />
        </section>
    </div>;
}

export { Page };
