import React, { useRef } from "react";
import { css } from "@styled-system/css";
import { getSnapshot, applySnapshot } from "mobx-state-tree";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut"
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

    const load = async () => {
        const content = await wrksnp?.load();
        const json = JSON.parse(content);
        applySnapshot(root, json);
    }

    return <div css={css(theme.divs.commonPage)}>
        <InOut />
        <section css={css(theme.sections.common)}>
            <h2>Экспорт-импорт на на удалённом сервере</h2>
            <form css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}>
                <button
                    css={css(theme.buttons.primary)}
                    onClick={saveNew}
                >Сохранить в новое хранилище</button>
                <div css={css(theme.divs.params)}>
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

                </div>
                <div css={css({ display: "flex", gap: "1rem" })}>
                    <button
                        css={css(theme.buttons.primary)}
                        disabled={!wrksnp}
                        onClick={save}
                    >Сохранить </button>
                    <button
                        css={css(theme.buttons.primary)}
                        disabled={!wrksnp}
                        onClick={load}
                    >
                        Загрузить
                    </button>
                    <button
                        css={css(theme.buttons.primary)}
                        disabled={!wrksnp}
                        onClick={wrksnps?.delete}
                    >Удалить</button>
                </div>
            </form>
            <Wrksnps css={css({ m: "6rem" })} />
        </section>
    </div>;
}

export const Page = observer(_Page);
