import React, { useEffect, useState } from "react";
import { css } from "@styled-system/css";
import { onSnapshot } from "mobx-state-tree";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _RenameWrksnp: React.FC = () => {
    const theme = useTheme();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const [title, setTitle] = useState<string>(wrksnps.selected?.title ?? "");

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
        css={css({ display: "flex", flexFlow: "row wrap", gap: "1rem" })}
        onSubmit={onSubmit}
    >
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
        <input
            type="submit"
            css={css(theme.buttons.primary)}
            disabled={isDisabled()}
            value="Переименовать"
        />
    </form>
}

export const RenameWrksnp = observer(_RenameWrksnp);
