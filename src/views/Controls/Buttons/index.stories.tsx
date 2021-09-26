import { PlayButton, PauseButton, StopButton } from "."
import { css } from "utils";
import 'styled-components/macro';

const diametr = "40px";

const buttonCSS = {
  height: diametr,
  width: diametr,
  borderWidth: "0.4px",
  fill: ["green", "yellow", "red"],
}

export default {
  title: 'tabata/IconButton',
};

export const Buttons = () => <div
  style={{
    display: "inline-flex",
  }}>
  <PlayButton css={css(buttonCSS)} onClick={() => console.log("PlayButton")} />
  <PauseButton css={css(buttonCSS)} onClick={() => console.log("PauseButton")} />
  <StopButton css={css(buttonCSS)} onClick={() => console.log("StopButton")} />
</div >;

