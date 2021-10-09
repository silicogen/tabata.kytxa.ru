import React, { useRef } from "react";
import { css } from "@styled-system/css";
import { getSnapshot, applySnapshot } from "mobx-state-tree";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut"
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { getSavedCurrentUser } from "auth/index";

const _Page: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const wrksnp = wrksnps.selected;
    const inputTitleRef = useRef<HTMLInputElement>(null);

    const savedCurrentUser = getSavedCurrentUser();
    remote.inOut.setCurrentUser(savedCurrentUser);

    if (inputTitleRef?.current) {
        inputTitleRef.current.value = wrksnp?.title ?? "";
    }

    const saveNew = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        wrksnps.saveNew(snapStr);
    }

    const saveName = () => {
        const title = inputTitleRef?.current?.value ?? "";
        wrksnp!.saveName(title);
    }
    const saveTo = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        const title = inputTitleRef?.current?.value ?? "";
        wrksnp!.saveTo(snapStr, title);
    }

    const load = async () => {
        const content = await wrksnp?.load();
        const json = JSON.parse(content);
        applySnapshot(root, json);
    }

    return <div css={css(theme.divs.commonPage)}>
        <InOut />
        {remote.inOut.isAuthenticated ?
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
                            onClick={saveName}
                        >Переименовать </button>
                        <button
                            css={css(theme.buttons.primary)}
                            disabled={!wrksnp}
                            onClick={saveTo}
                        >Сохранить текущее состояние </button>
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
            </section> : null}
    </div>
}

export const Page = observer(_Page);
