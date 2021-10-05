import React from "react";
import { css } from "@styled-system/css";
import { SaveButton } from "./SaveButton";
import { SaveNewButton } from "./SaveNewButton";
import { LoadButton } from "./LoadButton";
import { Wrksnps } from "./Wrksnps";
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    const theme = useTheme();
    return <div css={css(theme.divs.commonPage)}>
        <h2>Экспорт-импорт на на удалённом сервере</h2>
        <section css={css(theme.sections.common)}>
            <h3>Экспорт</h3>
            <SaveNewButton />
            <SaveButton />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Импорт</h3>
            <LoadButton />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Сохранённые наборы тренировок</h3>
            <Wrksnps />
        </section>

    </div>;
}

export { Page };
