import React, { useState } from "react";
import { css } from "utils";
// import 'styled-components/macro';
import { applySnapshot } from "mobx-state-tree";
import { useRoot } from "store/Root";
import FileSelector from './FileSelector';
import { useTheme } from "css/theme";

export default function Import({ onAfterImport }: { onAfterImport?: (file?: File) => void }) {
    const root = useRoot();
    const theme = useTheme();

    // @ts-ignore
    const [files, setFiles] = useState<FileList>(File[0]);

    const importFile = async (file: File) => {
        try {
            const text = await file.text();
            const json = JSON.parse(text);
            applySnapshot(root, json);
            // root.ui.setFile(file);
            onAfterImport?.(file);
        } catch (error) {
            console.error('' + error);
        }
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        const files = e.target.files;
        if (files && files.length > 0)
            setFiles(files)
    }

    return <div css={css({ maxWidth: "15rem" })}>
        <FileSelector onChange={onChange} />
        <button
            css={css(theme.buttons.primary)}
            style={{ display: files ? 'unset' : 'none', margin: "1rem 0 0 0" }}
            onClick={() => files[0] && importFile(files[0])}
        >
            {`Загрузить выбранный файл `}
        </button>
    </div>
}
