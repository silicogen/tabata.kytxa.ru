import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import Remote, { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";



export const _DelButton: React.FC = () => {

  const theme = useTheme();
  const root = useRoot();
  let wrksnps = useRemote().wrksnps;
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
    try {
      const res = await axios.delete(`${API_ROUTE}/posts/${wrksnp!.id}`);
      let message: string;
      if (res.status >= 200 && res.status < 300) {
        wrksnps.rmItem(wrksnp!);
        message = `Хранилище ${title} успешно удалено.`
      } else {
        message = `Что-то пошло не так ${title}.`;
      }
      window.alert(`${message}
     status: ${res.status}, statusText: ${res.statusText}`);
    } catch (ex) {
      window.alert(
        `Не удалось удалить хранилище ${title} на сервере.
      ${ex}`)
    }

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