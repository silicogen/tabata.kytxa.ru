import React from "react";
import { observer } from "mobx-react";

import { css } from "@styled-system/css";
import { useRoot } from "store/Root";

const HamburgerButton0: React.FC = () => {
    const ui = useRoot().ui;
    return <span
        css={css({
            display: ["initial", "none"]
        })}
        className={`hamburger--squeeze  ${ui.navMenuIsCollapsed ? "" : "is-active"} `}
        onClick={ui.toggleNavMenuIsCollapsed}
        aria-label="Меню">
        <span className={`hamburger-box`}>
            <span className="hamburger-inner" ></span>
        </span>
    </span>
}

export const HamburgerButton = observer(HamburgerButton0);