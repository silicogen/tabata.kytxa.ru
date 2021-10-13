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

    const submitIsDisabled = () => wrksnps.selected == undefined || title == wrksnps.selected?.title;
    const nameInputIsDisabled = () => wrksnps.selected == undefined;

    return <form
        css={css({ display: "flex", flexFlow: "row wrap", gap: "1rem", alignItems: "center" })}
        onSubmit={onSubmit}
    >
        <label
            htmlFor="nameInput"
            css={css(theme.fieldsets)}
        >
            Наименование:
        </label>
        <input
            id="nameInput"
            css={css(theme.inputs.name)}
            disabled={nameInputIsDisabled()}
            onChange={onChange}
            value={title}
        />
        <input
            type="submit"
            css={css(theme.buttons.primary)}
            disabled={submitIsDisabled()}
            value="Переименовать"
        />
    </form>
}

export const RenameWrksnp = observer(_RenameWrksnp);
