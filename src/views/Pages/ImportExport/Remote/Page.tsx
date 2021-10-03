import React from "react";
import { css } from '@styled-system/css';
import { PutButton } from "./PutButton";
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    const theme = useTheme();
    async function onAfterImport() {
    }
    return <div css={css(theme.divs.commonPage)}>
        <h2>Экспорт-импорт на на удалённом сервере</h2>
        <section css={css(theme.sections.common)}>
            <h3>Экспорт</h3>
            <PutButton />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Импорт</h3>
            {/* <Import onAfterImport={onAfterImport} /> */}
        </section>
    </div>;
}

export { Page };
