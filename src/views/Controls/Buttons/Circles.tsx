import React from 'react';
import { css } from "@styled-system/css";
import { SystemStyleObject } from "@styled-system/css";
import PlaySVG  from "icons/me/play.svg";
import PauseSVG  from "icons/me/pause.svg";
import StopSVG  from "icons/me/stop.svg";
import PlusSVG  from "icons/me/plus-round.svg";
import MinusSVG  from "icons/me/minus-round.svg";
import CancelSVG  from "icons/me/close-round.svg";
import DeleteSVG  from "icons/me/android-delete.svg";
import EditSVG  from "icons/me/compose.svg";
import UpSVG  from "icons/me/row-up-c.svg";
import DownSVG  from "icons/me/row-down-c.svg";
import LeftSVG  from "icons/me/arrow-left-c.svg";
import ReturnOkSVG  from "icons/me/return-ok.svg";
import OkSVG  from "icons/me/checkmark-round.svg";

type Strings = string | string[];

const diametr = "40px";
const buttonCSS: SystemStyleObject = {
  bg: "inherit",
  display: "flex",
  outlineStyle: "none",
  borderRadius: "50%",
  padding: "0px",
  margin: "0px",
  width: diametr,
  height: diametr,
  fill: ["green"],
  "&:disabled": {
    fill: ["gray"],
  }
}
const svgCSS: SystemStyleObject = {
  width: "80%",
  height: "80%",
  margin: "auto",
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { diametr?: Strings }

export const PlusButton1: React.FC<ButtonProps> = props =>
  <button {...props} >
    <PlusSVG />
  </button>

export const PlusButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <PlusSVG css={css(svgCSS)} />
  </button>

export const MinusButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <MinusSVG css={css(svgCSS)} />
  </button>

export const IncrementButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <PlusSVG css={css({ ...svgCSS, fill: "black" })} />
  </button>

export const DecrementButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <MinusSVG css={css({ ...svgCSS, fill: "black" })} />
  </button>

export const CancelButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <CancelSVG css={css(svgCSS)} />
  </button>

export const DeleteButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <DeleteSVG css={css(svgCSS)} />
  </button>

export const EditButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <EditSVG css={css(svgCSS)} />
  </button>

export const UpButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <UpSVG css={css(svgCSS)} />
  </button>

export const DownButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <DownSVG css={css(svgCSS)} />
  </button>

export const PlayButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <PlaySVG css={css({ ...svgCSS, width: "90%", height: "90%", marginLeft: "13%" })} />
  </button>

export const PauseButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <PauseSVG css={css(svgCSS)} />
  </button>

export const StopButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <StopSVG css={css(svgCSS)} />
  </button>

export const OkButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <OkSVG css={css(svgCSS)} />
  </button>

export const ReturnOkButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <ReturnOkSVG css={css(svgCSS)} />
  </button>

export const LeftButton: React.FC<ButtonProps> = props =>
  <button {...props} css={css(buttonCSS)}>
    <LeftSVG css={css(svgCSS)} />
  </button>