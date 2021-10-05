import { css } from "@styled-system/css";
import { useTheme } from 'css/theme';
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { FormEvent } from "react";

export const _DelButton: React.FC = () => {
  const theme = useTheme();
  let wrksnps = useRemote().wrksnps;
  let wrksnp = useRemote().wrksnps.selected;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    wrksnps?.delete();
  }

  return <>
    <form
      onSubmit={onSubmit}
    >
      <input
        css={css(theme.buttons.primary)}
        disabled={!wrksnp}
        type="submit"
        value="Удалить"
      />
    </form>
  </>
}

export const DelButton = observer(_DelButton);