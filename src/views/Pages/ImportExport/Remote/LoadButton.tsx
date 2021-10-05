import { css } from "@styled-system/css";
import { applySnapshot, SnapshotIn } from "mobx-state-tree";
import { observer } from "mobx-react";
import { useTheme } from 'css/theme';
import Root, { useRoot } from "store/Root";
import { useRemote } from "store/Remote";

const _LoadButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  const wrksnp = useRemote().wrksnps.selected;
  return <button
    css={css(theme.buttons.primary)}
    disabled={!wrksnp}
    onClick={async () => {
      const content = await wrksnp?.load();
      const json: SnapshotIn<typeof Root> = JSON.parse(content);
      applySnapshot(root, json);
    }}
  >
    Загрузить
  </button>
}

export const LoadButton = observer(_LoadButton);