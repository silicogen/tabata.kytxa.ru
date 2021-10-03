import React, { useRef } from 'react';
import { css } from "utils";
// import 'styled-components/macro';
import { useTheme } from 'css/theme';

const onDragOver: React.DragEventHandler<HTMLLabelElement> = e => {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
};

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function FileSelector({ onChange }: Props) {
  const theme = useTheme();
  const inputEl = useRef<HTMLInputElement>(null);

  const onDrop: React.DragEventHandler<HTMLLabelElement> = async e => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;
    const element = inputEl.current;
    if (element && onChange && files) {
      element.files = files;
      onChange({ target: element } as React.ChangeEvent<HTMLInputElement>);
    }
  }
  const files = inputEl.current?.files;

  return <div style={{ display: "flex", flexFlow: "column" }}>
    <input
      ref={inputEl}
      id="selectFileButton"
      type="file"
      style={{ display: 'none' }}
      accept=".json"
      onChange={onChange}
    />

    <button css={css(theme.buttons.primary)}>
      <label
        style={{ display: "block" }}
        onDragOver={onDragOver}
        onDrop={onDrop}
        htmlFor="selectFileButton">
        Выбор файла
      </label>
    </button>

    <span
      style={{ display: files?.length ? "unset" : "none" }}
      css={css(theme.comments.primary)}>
      {`Выбран файл: ${files?.[0]?.name}`}</span>
  </div>
}