import React from 'react';
import { css } from '@styled-system/css';
// import { css } from "utils";
// import 'styled-components/macro';
import { useRoot } from "store/Root";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import NavLink from 'views/Misc/NavLink';
import Home from "views/Pages/Home";
import { Page as WorkoutsPage } from 'views/Pages/Workouts';
import { Page as ExercizesPage, DisplayPath as ExercizesDisplayPath } from 'views/Pages/Exercizes';
import { Page as PhazesPage, DisplayPath as PhazesDisplayPath } from 'views/Pages/Phazes';
import { ImportExport } from "views/Pages/ImportExport";
import Goer from "views/Pages/Goer";
import About from "views/Pages/About";
// import { App as ForumApp } from "forum";
import { observer } from "mobx-react";
import { HamburgerButton } from "views/Controls/Buttons";
import theme from "css/theme";

const App: React.FC = () => {
    const root = useRoot();
    const uiStore = root.ui;
    return <div css={css(theme.layout.gridContainer)}>
        <BrowserRouter  >
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
                <NavLink to="/importExport">Хранилище</NavLink>
                <NavLink to="/about">Что это?</NavLink>
                <NavLink to="/forum">Форум</NavLink>
            </nav>

            <main onClick={uiStore.collapseNavMenu}
                css={css(theme.layout.main)} >
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/go" component={Goer} />
                    <Route path="/workouts" component={WorkoutsPage} />
                    <Route path="/exercizes" component={ExercizesPage} />
                    <Route path="/phazes" component={PhazesPage} />
                    <Route path="/importExport" component={ImportExport} />
                    <Route path="/about" component={About} />
                    {/* <Route path="/forum" component={ForumApp} /> */}
                </Switch>
            </main>
        </BrowserRouter>
    </div >
}

export default observer(App);