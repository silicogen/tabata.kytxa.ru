import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";



export const PutButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  return <button
    css={css(theme.buttons.primary)}
    onClick={async () => {
      const snap = getSnapshot(root);
      const snapStr = JSON.stringify(snap, undefined, 4);
      await axios.put(`${API_ROUTE}/posts/${"1"}`, {
        id: 1,
        content: snapStr,
        author_id: 1,
        title: 'test state 1'
      })
    }}
  >
    Update
  </button>
}