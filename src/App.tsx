import React from 'react';
import { css } from "@styled-system/css";

import { useRoot } from "store/Root";
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import NavLink from 'views/Misc/NavLink';
import Home from "views/Pages/Home";
import { Page as WorkoutsPage } from 'views/Pages/Workouts';
import { Page as ExercizesPage, DisplayPath as ExercizesDisplayPath } from 'views/Pages/Exercizes';
import { Page as PhazesPage, DisplayPath as PhazesDisplayPath } from 'views/Pages/Phazes';
import { ImportExport } from "views/Pages/ImportExport";
import { LocalImportExport } from "views/Pages/ImportExport/Local"
import { RemoteImportExport } from "views/Pages/ImportExport/Remote"
import Goer from "views/Pages/Goer";
import About from "views/Pages/About";
import { App as ForumApp } from "forum";
import { observer } from "mobx-react";
import { HamburgerButton } from "views/Controls/Buttons";
import theme from "css/theme";
ImportExport
const App: React.FC = () => {
    const root = useRoot();
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
                    </Switch>
                </span>
            </header>

            <nav
                css={css(theme.layout.nav(uiStore.navMenuIsCollapsed))}>
                <NavLink to="/" exact>Домой</NavLink>
                <NavLink to="/go">Выполнение</NavLink>
                <NavLink to="/workouts">Тренировки</NavLink>
                <NavLink to="/exercizes">Упражнения</NavLink>
                <NavLink to="/phazes">Фазы</NavLink>
                <NavLink to="/file">Файл</NavLink>
                <NavLink to="/forum">Сервер</NavLink>
                <NavLink to="/server">Сервер1</NavLink>
                <NavLink to="/about">Что это?</NavLink>

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

                </Switch>
            </main>
        </Router>
    </div >
}

export default observer(App);