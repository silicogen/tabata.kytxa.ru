import React, { useRef } from "react";
import { css } from "@styled-system/css";
import { getSnapshot } from "mobx-state-tree";
import { DelButton } from "./DelButton";
import { LoadButton } from "./LoadButton";
import { Wrksnps } from "./Wrksnps";
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _Page: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const wrksnp = wrksnps.selected;
    const inputTitleRef = useRef<HTMLInputElement>(null);
    if (inputTitleRef?.current) {
        inputTitleRef.current.value = wrksnp?.title ?? "";
    }

    const saveNew = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        wrksnps.saveNew(snapStr);
    }

    const save = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        const title = inputTitleRef?.current?.value ?? "";
        wrksnp!.save(snapStr, title);
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
            <div>
                <label
                    htmlFor="nameInput"
                    style={{ justifySelf: "end" }}>
                    Наименование:
                </label>
                <input
                    ref={inputTitleRef}
                    id="nameInput"
                    disabled={!wrksnp}
                    css={css(theme.inputs.name)}
                />
                <input
                    css={css(theme.buttons.primary)}
                    type="submit"
                    value="Сохранить"
                    onClick={save}
                />
            </div>
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

export const Page = observer(_Page);
