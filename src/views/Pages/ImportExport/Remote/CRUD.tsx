import { css } from "@styled-system/css";
import { getSnapshot, applySnapshot } from "mobx-state-tree";
import { useTheme } from "css/theme";
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _CRUD: React.FC = () => {
    const theme = useTheme();
    const root = useRoot();
    const remote = useRemote();
    const wrksnps = remote.wrksnps;
    const wrksnp = wrksnps.selected;

    const saveNew = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        wrksnps.saveNew(snapStr);
    }

    const saveTo = () => {
        const snap = getSnapshot(root);
        const snapStr = JSON.stringify(snap, undefined, 4);
        const title = wrksnp?.title ?? "";
        wrksnp!.saveTo(snapStr, title);
    }

    const load = async () => {
        const content = await wrksnp?.load();
        const json = JSON.parse(content);
        applySnapshot(root, json);
    }

    return <form css={css({ display: "flex", flexFlow: "row wrap", gap: "1rem" })}>
        <button
            css={css(theme.buttons.primary)}
            onClick={saveNew}
        >Создать</button>

        <button
            css={css(theme.buttons.primary)}
            disabled={!wrksnp}
            onClick={saveTo}
        >Сохранить в</button>

        <button
            css={css(theme.buttons.primary)}
            disabled={!wrksnp}
            onClick={load}
        >Загрузить из</button>

        <button
            css={css(theme.buttons.primary)}
            disabled={!wrksnp}
            onClick={wrksnps?.delete}
        >Удалить</button>
    </form>

}

export const CRUD = observer(_CRUD);
