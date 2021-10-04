import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";



export const _SaveButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  const wrksnp = useRemote().wrksnps.selected;
  return <button
    css={css(theme.buttons.primary)}
    disabled={!wrksnp}
    onClick={async () => {
      const snap = getSnapshot(root);
      const snapStr = JSON.stringify(snap, undefined, 4);
      await axios.put(`${API_ROUTE}/posts/${wrksnp.id}`, {
        content: snapStr,
        title: new Date().toLocaleString()
      })
    }}
  >
    Сохранить
  </button >
}

export const SaveButton = observer(_SaveButton);