import React from "react";
import { css } from "@styled-system/css";

import ChevronSVG  from "icons/oi/chevron-right.svg";
import CaretSVG  from "icons/oi/caret-right.svg";
import theme from "css/theme";

type Strings = string | string[];

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { diametr?: Strings }

export const ChevronButton: React.FC<ButtonProps & { isRotated: () => boolean }> = props =>
  <button
    {...props}
    css={css({
      border: "none",
      bg: "inherit",
      outlineStyle: "none",
      width: "3rem",
      textAlign: "center"
    })}
  >
    <ChevronSVG css={css({
      width: "1rem",
      height: "1rem",
      transition: "transform 300ms ease",
      ...props.isRotated() ? { transform: 'rotate(90deg)' } : {}
    })} />
  </button>

export const ChevronDetails: React.FC<
  ButtonProps &
  { isRotated: boolean, disabled?: boolean }> = props =>
    <button
      {...props}
      css={css({
        border: "none",
        bg: "inherit",
        outlineStyle: "none"
      })}
    >
      <span style={{ width: "2rem", display: "inline-block" }}>
        <ChevronSVG css={css({
          width: "1rem",
          height: "1rem",
          transition: "transform 300ms ease",
          transform: props.isRotated ? 'rotate(90deg)' : "unset",
          fill: props.disabled ? theme.colors.disabled : "unset"
        })} />
      </span>
      {props.children}
    </button>

export const LayersButton: React.FC<ButtonProps & { isRotated: () => boolean }> = props =>
  <button
    {...props}
    css={css({
      border: "none",
      bg: "inherit",
      outlineStyle: "none",
      width: "3rem",
      textAlign: "center"
    })}
  >
    <CaretSVG css={css({
      width: "1rem",
      height: "1rem",
      transition: "transform 300ms ease",
      ...props.isRotated() ? { transform: 'rotate(90deg)' } : {}
    })} />
  </button>