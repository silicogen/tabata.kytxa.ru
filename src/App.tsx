import React from 'react';
import { css } from "@styled-system/css";

import { useRoot } from "store/Root";
import {
    HashRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";
import { MenuNavLink } from 'views/Misc/NavLink';
import { About } from "views/Pages/About"
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
import { Login } from 'views/Pages/ImportExport/Remote/User/Login';
import { Registration } from 'views/Pages/ImportExport/Remote/User/Registration';
import { Profile } from 'views/Pages/ImportExport/Remote/User/Profile';
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
                        <Route path="/profile">Профиль</Route>
                        <Route path="/registration">Регистрация</Route>
                        <Route path="/about">О сайте</Route>
                    </Switch>
                </span>

                <span css={css({ display: "flex", alignItems: "center" })}>
                    {inOut.isAuthenticated
                        ? <>
                            <NavLink
                                to="/profile"
                                css={css(theme.navLinks.headNavLink)}
                            >
                                <span
                                    css={css({ display: ["none", "initial"] })}
                                >{inOut.currentUser?.username}</span>
                                <UserOutSVG css={css(theme.svgs.inOutHeadLink)} />
                            </NavLink>

                            <NavLink
                                to="/login"
                                onClick={inOut.logOut}
                                css={css(theme.navLinks.headNavLink)}
                            >Выйти</NavLink>
                        </>
                        : <>
                            <NavLink
                                to="/registration"
                                css={css(theme.navLinks.headNavLink)}
                            >< UserInSVG css={css(theme.svgs.inOutHeadLink)} /> </NavLink>

                            <NavLink
                                to="/login"
                                css={css(theme.navLinks.headNavLink)}
                            >Логин</NavLink>
                        </>
                    }
                </span>
            </header>

            <nav css={css(theme.layout.nav(uiStore.navMenuIsCollapsed))}>

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
                <MenuNavLink to="/about">
                    <HomeSVG css={css(theme.svgs.inMenuNavLink)} />Что это
                </MenuNavLink>
            </nav>

            <main onClick={uiStore.collapseNavMenu}
                css={css(theme.layout.main)} >
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/go" />} />
                    <Route path="/go" component={Goer} />
                    <Route path="/workouts" component={WorkoutsPage} />
                    <Route path="/exercizes" component={ExercizesPage} />
                    <Route path="/phazes" component={PhazesPage} />
                    <Route path="/file" component={LocalImportExport} />
                    <Route path="/server" component={RemoteImportExport} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/about" component={About} />
                </Switch>
            </main>
        </Router>
    </div >
}

export default observer(App);