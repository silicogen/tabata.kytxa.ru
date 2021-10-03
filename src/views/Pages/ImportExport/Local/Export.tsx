import React from "react";
import { css } from "@styled-system/css";
import download from 'downloadjs';
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import { getSnapshot } from "mobx-state-tree";

const Export: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const dl = () => {
        const snap = getSnapshot(root);
        const blob = new Blob([JSON.stringify(snap, undefined, 4)], { type: 'text/plain' });
        download(blob, "tabata.json", "application/json");
    }
    return <button
        css={css(theme.buttons.primary)}
        onClick={dl}>
        Экспорт в json файл
    </button>;
}

export default Export;