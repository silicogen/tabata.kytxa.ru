import React from "react";
import { css } from "@styled-system/css";
import { PutButton } from "./PutButton";
import { GetButton } from "./GetButton";
import { Wrksnps } from "./Wrksnps";
import { useTheme } from "css/theme";

const Page: React.FC = () => {
    const theme = useTheme();
    return <div css={css(theme.divs.commonPage)}>
        <h2>Экспорт-импорт на на удалённом сервере</h2>
        <section css={css(theme.sections.common)}>
            <h3>Экспорт</h3>
            <PutButton />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Импорт</h3>
            <GetButton />
        </section>
        <section css={css(theme.sections.common)}>
            <h3>Сохранённые наборы тренировок</h3>
            <Wrksnps />
        </section>

    </div>;
}

export { Page };
