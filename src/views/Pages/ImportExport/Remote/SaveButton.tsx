import { css } from "@styled-system/css";
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { FormEvent, useRef } from "react";

export const _SaveButton: React.FC = () => {
  const theme = useTheme();
  const root = useRoot();
  let wrksnp = useRemote().wrksnps.selected;
  let inputTitleRef = useRef<HTMLInputElement>(null);
  if (inputTitleRef?.current) {
    inputTitleRef.current.value = wrksnp?.title ?? "";
  }
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const snap = getSnapshot(root);
    const snapStr = JSON.stringify(snap, undefined, 4);
    const title = inputTitleRef?.current?.value ?? "";
    wrksnp!.save(snapStr, title);
  }

  return <>
    <form
      onSubmit={onSubmit}
    >
      <label
        htmlFor="nameInput"
        style={{ justifySelf: "end" }}>
        Наименование:
      </label>
      <input
        ref={inputTitleRef}
        id="nameInput"
        disabled={!wrksnp}
        css={css(theme.inputs.name)}
      />
      <input
        css={css(theme.buttons.primary)}
        type="submit"
        value="Сохранить"
      />
    </form>
  </>
}

export const SaveButton = observer(_SaveButton);