import React from "react";
import { css } from "@styled-system/css";
import { getSnapshot } from "mobx-state-tree";
import { SaveButton } from "./SaveButton";
import { DelButton } from "./DelButton";
import { LoadButton } from "./LoadButton";
import { Wrksnps } from "./Wrksnps";
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";

const Page: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const wrksnps = useRemote().wrksnps;
    
    const saveNew = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        wrksnps.saveNew(snapStr);
    }

    return <div css={css(theme.divs.commonPage)}>
        <h2>Экспорт-импорт на на удалённом сервере</h2>

        <section css={css(theme.sections.common)}>
            <h3>Экспорт</h3>
            <input
                css={css(theme.buttons.primary)}
                type="submit"
                value="Сохранить в новое хранилище"
                onClick={saveNew}
            />
            <SaveButton />
            <DelButton />
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
