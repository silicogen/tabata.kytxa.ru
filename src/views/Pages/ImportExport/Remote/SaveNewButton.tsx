import { css } from "@styled-system/css";
import API_ROUTE from "forum/apiRoute";
import axios from 'axios'
import { getSnapshot } from "mobx-state-tree";
import { useTheme } from 'css/theme';
import { useRoot } from "store/Root";
import Remote, { useRemote } from "store/Remote";
import { observer } from "mobx-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";



export const _SaveNewButton: React.FC = () => {

  const theme = useTheme();
  const root = useRoot();
  let wrksnps = useRemote().wrksnps;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const snap = getSnapshot(root);
    const snapStr = JSON.stringify(snap, undefined, 4);
    const title = "Новое хранилище";
    try {
      const res = await axios.post(`${API_ROUTE}/posts`, {
        content: snapStr,
        title
      });
      let message: string;
      if (res.status >= 200 && res.status < 300) {
        // const resp = await axios.get(`${API_ROUTE}/posts/${wrksnp!.id}`);
        // const response = resp.data.response;
        // wrksnp?.setUpdated_at(response.updated_at)
        // wrksnp?.setTitle(title);
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
      <input
        css={css(theme.buttons.primary)}
        type="submit"
        value="Сохранить в новое хранилище"
      />
    </form>
  </>
}

export const SaveNewButton = observer(_SaveNewButton);