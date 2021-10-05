import { css } from "@styled-system/css";
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { FormEvent } from "react";

export const _SaveNewButton: React.FC = () => {

  const theme = useTheme();
  const root = useRoot();
  let wrksnps = useRemote().wrksnps;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const snap = getSnapshot(root);
    const snapStr = JSON.stringify(snap, undefined, 4);
    wrksnps.saveNew(snapStr);
  }

  return <>
    <form
      onSubmit={onSubmit}
    >
      <input
        css={css(theme.buttons.primary)}
        type="submit"
        value="Сохранить в новое хранилище"
      />
    </form>
  </>
}

export const SaveNewButton = observer(_SaveNewButton);