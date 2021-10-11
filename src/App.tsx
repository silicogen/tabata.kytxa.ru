import React from 'react';
import { css } from "@styled-system/css";

import { useRoot } from "store/Root";
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import { MenuNavLink } from 'views/Misc/NavLink';
import Home from "views/Pages/Home";
import { Page as WorkoutsPage } from 'views/Pages/Workouts';
import { Page as ExercizesPage, DisplayPath as ExercizesDisplayPath } from 'views/Pages/Exercizes';
import { Page as PhazesPage, DisplayPath as PhazesDisplayPath } from 'views/Pages/Phazes';
import { LocalImportExport } from "views/Pages/ImportExport/Local"
import { RemoteImportExport } from "views/Pages/ImportExport/Remote"
import Goer from "views/Pages/Goer";
import About from "views/Pages/About";
import { App as ForumApp } from "forum";
import { observer } from "mobx-react";
import { HamburgerButton } from "views/Controls/Buttons";
import theme from "css/theme";
import { useRemote } from 'store/Remote';
import { InOut } from 'views/Pages/ImportExport/Remote/InOut';
import { Registration } from 'views/Pages/ImportExport/Remote/Registration';

const App: React.FC = () => {
    const root = useRoot();
    const inOut = useRemote().inOut;
    const uiStore = root.ui;
    return <div css={css(theme.layout.gridContainer)}>
        <Router  >
            <header
                css={css(theme.layout.header)}>
                <HamburgerButton />
                <span>
                    Табата\
                    <Switch >
                        <Route path="/" exact>Дом</Route>
                        <Route path="/go">Выполнение</Route>
                        <Route path="/workouts">Тренировки</Route>
                        <Route
                            path="/exercizes/"
                            component={ExercizesDisplayPath} />
                        <Route
                            path="/phazes/"
                            component={PhazesDisplayPath} />
                        <Route path="/importExport">Хранилище</Route>
                        <Route path="/about">Что это?</Route>
                        <Route path="/forum">Форум</Route>
                        <Route path="/login">Логин</Route>
                    </Switch>
                </span>
                <span>
                    {inOut.isAuthenticated
                        ? <NavLink
                            to="/login"
                            onClick={inOut.logOut}
                            css={css(theme.navLinks.headNavLink)}
                        >Выйти</NavLink>
                        : <NavLink
                            to="/login"
                            css={css(theme.navLinks.headNavLink)}
                        >Логин</NavLink>}
                </span>
            </header>

            <nav
                css={css(theme.layout.nav(uiStore.navMenuIsCollapsed))}>
                <MenuNavLink to="/" exact>Домой</MenuNavLink>
                <MenuNavLink to="/go">Выполнение</MenuNavLink>
                <MenuNavLink to="/workouts">Тренировки</MenuNavLink>
                <MenuNavLink to="/exercizes">Упражнения</MenuNavLink>
                <MenuNavLink to="/phazes">Фазы</MenuNavLink>
                <MenuNavLink to="/file">Файл</MenuNavLink>
                <MenuNavLink to="/forum">Сервер</MenuNavLink>
                <MenuNavLink to="/server">Сервер1</MenuNavLink>
                <MenuNavLink to="/about">Что это?</MenuNavLink>

            </nav>

            <main onClick={uiStore.collapseNavMenu}
                css={css(theme.layout.main)} >
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/go" component={Goer} />
                    <Route path="/workouts" component={WorkoutsPage} />
                    <Route path="/exercizes" component={ExercizesPage} />
                    <Route path="/phazes" component={PhazesPage} />
                    <Route path="/file" component={LocalImportExport} />
                    <Route path="/forum" component={ForumApp} />
                    <Route path="/server" component={RemoteImportExport} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={InOut} />
                    <Route path="/registration" component={Registration} />
                </Switch>
            </main>
        </Router>
    </div >
}

export default observer(App);