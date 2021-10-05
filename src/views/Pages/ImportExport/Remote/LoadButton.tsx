import { css } from "@styled-system/css";
import { applySnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";

const _LoadButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  const wrksnp = useRemote().wrksnps.selected;
  return <button
    css={css(theme.buttons.primary)}
    disabled={!wrksnp}
    onClick={async () => {
      const snp = await wrksnp?.load();
      applySnapshot(root, snp);
    }}
  >
    Загрузить
  </button>
}

export const LoadButton = observer(_LoadButton);