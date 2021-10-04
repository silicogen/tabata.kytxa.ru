import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import Remote, { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";



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
    try {
      const res = await axios.put(`${API_ROUTE}/posts/${wrksnp!.id}`, {
        content: snapStr,
        title: inputTitleRef?.current?.value ?? ""
      });
      let message: string;
      if (res.status >= 200 && res.status < 300) {
        const resp = await axios.get(`${API_ROUTE}/posts/${wrksnp!.id}`);
        const response = resp.data.response;
        wrksnp?.setUpdated_at(response.updated_at)
        wrksnp?.setTitle(title);
        message = `Текущая работа успешно сохранена с именем ${title}.`
      } else {
        message = `Что-то пошло не так ${title}.`;
      }
      window.alert(`${message}
     status: ${res.status}, statusText: ${res.statusText}`);
    } catch (ex) {
      window.alert(
      `Не удалось сохранить работу на сервере.
      ${ex}`)
    }

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