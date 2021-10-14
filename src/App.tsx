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
import { RemoteImportExport } from "views/Pages/ImportExport/Remote/Wrksnps"
import Goer from "views/Pages/Goer";
import { observer } from "mobx-react";
import { HamburgerButton } from "views/Controls/Buttons";
import theme from "css/theme";
import { useRemote } from 'store/Remote';
import { InOut } from 'views/Pages/ImportExport/Remote/User/InOut';
import { Registration } from 'views/Pages/ImportExport/Remote/User/Registration';
import { UpdateUser } from 'views/Pages/ImportExport/Remote/User/UpdateUser';
import {
    HomeSVG, PlaySVG, TraineSVG, ExercizeSVG, PhazeSVG, FileSVG, ServerSVG,
    UserInSVG, UserOutSVG
} from "icons/used";

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
                        <Route path="/server">Сервер</Route>
                        <Route path="/file">Файл</Route>
                        <Route path="/login">Логин</Route>
                        <Route path="/userEdit">Изменить пользователя</Route>
                    </Switch>
                </span>

                <span css={css({ display: "flex", alignItems: "center" })}>
                    {inOut.isAuthenticated
                        ? <NavLink
                            to="/login"
                            onClick={inOut.logOut}
                            css={css(theme.navLinks.headNavLink)}
                        ><UserOutSVG css={css(theme.svgs.inOutHeadLink)} />Выйти</NavLink>
                        : <NavLink
                            to="/login"
                            css={css(theme.navLinks.headNavLink)}
                        >< UserInSVG css={css(theme.svgs.inOutHeadLink)} />Логин</NavLink>}
                </span>
            </header>

            <nav
                css={css(theme.layout.nav(uiStore.navMenuIsCollapsed))}>
                <MenuNavLink to="/" exact>
                    <HomeSVG css={css(theme.svgs.inMenuNavLink)} />Домой
                </MenuNavLink>
                <MenuNavLink to="/go" >
                    <PlaySVG css={css(theme.svgs.inMenuNavLink)} />Выполнение
                </MenuNavLink>
                <MenuNavLink to="/workouts">
                    <TraineSVG css={css(theme.svgs.inMenuNavLink)} />Тренировки
                </MenuNavLink>
                <MenuNavLink to="/exercizes">
                    <ExercizeSVG css={css(theme.svgs.inMenuNavLink)} />Упражнения
                </MenuNavLink>
                <MenuNavLink to="/phazes">
                    <PhazeSVG css={css(theme.svgs.inMenuNavLink)} />Фазы
                </MenuNavLink>
                <MenuNavLink to="/file">
                    <FileSVG css={css(theme.svgs.inMenuNavLink)} />Файл
                </MenuNavLink>
                <MenuNavLink to="/server">
                    <ServerSVG css={css(theme.svgs.inMenuNavLink)} />Сервер
                </MenuNavLink>
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
                    <Route path="/server" component={RemoteImportExport} />
                    <Route path="/login" component={InOut} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/updateUser" component={UpdateUser} />
                </Switch>
            </main>
        </Router>
    </div >
}

export default observer(App);