import React, { useEffect, useRef, useState } from "react";
import { css } from "@styled-system/css";
import { getSnapshot, applySnapshot, onSnapshot } from "mobx-state-tree";
import { Wrksnps } from "./Wrksnps";
import { InOut } from "./InOut"
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { getSavedCurrentUser } from "auth/index";

const _RenameWrksnp: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const wrksnp = wrksnps.selected;
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>(wrksnps.selected?.title ?? "");

    const savedCurrentUser = getSavedCurrentUser();
    remote.inOut.setCurrentUser(savedCurrentUser);

    useEffect(() => {
        return onSnapshot(wrksnps, () => {
            setTitle(wrksnps.selected?.title ?? "")
        });
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget?.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        wrksnps.selected?.saveName(title);
    };

    const isDisabled = () => wrksnps.selected == undefined || title == wrksnps.selected?.title;

    return <form
        css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
        onSubmit={onSubmit}
    >
        <div css={css(theme.divs.params)}>
            <label
                htmlFor="nameInput"
                style={{ justifySelf: "end" }}>
                Наименование:
            </label>
            <input
                id="nameInput"
                css={css(theme.inputs.name)}
                onChange={onChange}
                value={title}
            />
        </div>

        <input
            type="submit"
            css={css(theme.buttons.primary)}
            disabled={isDisabled()}
            value="Переименовать"
        />
    </form>
}

export const RenameWrksnp = observer(_RenameWrksnp);
