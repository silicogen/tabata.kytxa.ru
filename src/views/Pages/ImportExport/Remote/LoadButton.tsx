import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { applySnapshot } from "mobx-state-tree";
import { observer } from "mobx-react";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";

const _LoadButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  return <div> <button
    css={css(theme.buttons.primary)}
    onClick={async () => {
      try {
        const res = await axios.get(`${API_ROUTE}/posts/${"1"}`);
        const content = (res as any).data.response.content;
        const json = JSON.parse(content);

        applySnapshot(root, json);
      } catch (error) {
        console.error(error);
      }
    }}
  >
    Get
  </button>
  </div>
}

export const LoadButton = observer(_LoadButton);