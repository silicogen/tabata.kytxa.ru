import React from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRoot } from "store/Root";
import { css } from "@styled-system/css";

import { useTheme } from 'css/theme';

const _MenuNavLink: React.FC<NavLinkProps> = props => {
    const ui = useRoot().ui;
    const theme = useTheme();
    return <NavLink
        css={css(theme.navLinks.menuNavLink)}
        {...props}
        onClick={(e) => { ui.collapseNavMenu(); props.onClick?.(e) }}
    />;
}

export const MenuNavLink = observer(_MenuNavLink);