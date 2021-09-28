import React from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";
import { useRoot } from "store/Root";
import { css } from "utils";
// import 'styled-components/macro';
import { useTheme } from 'css/theme';

const NavLink1: React.FC<NavLinkProps> = props => {
    const ui = useRoot().ui;
    const theme = useTheme(); 
    return <NavLink
        css={css(theme.navLinks.nav)}
        {...props}
        onClick={ui.collapseNavMenu}
    />;
}

export default NavLink1;