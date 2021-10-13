import React, { useState } from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const _InOut: React.FC = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const theme = useTheme();
    const inOut = useRemote().inOut;

    const credentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inOut.setIncorrectPasswordOrEmail(false);
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const logIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inOut.logIn(credentials).then(alert);
    }

    const deleteUser = () => inOut.deleteUser().then(alert);

    return <section css={css(theme.sections.common)}>
        <h2>Вход-выход</h2>
        {inOut.isAuthenticated ?
            <form
                css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
            >
                <span>Выполнен вход на сервер. Пользователь: {inOut.currentUser?.username}, почта: {inOut.currentUser?.email}.</span>
                <NavLink to="/updateUser" css={css(theme.navLinks.pageNavLink)}>Редактировать пользователя {inOut.currentUser?.username}</NavLink>
                <button
                    css={css(theme.buttons.primary)}
                    onClick={deleteUser}
                >Удалить пользователя {inOut.currentUser?.username}
                </button>
            
            </form>
            :
            <form
                css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
                onSubmit={logIn}
            >
                <div css={css(theme.divs.params)}>
                    <label
                        htmlFor="loginInput"
                        style={{ justifySelf: "end" }}>
                        Логин:
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Введите email"
                        onChange={credentialsChange}
                        value={credentials.email}
                        id="loginInput"
                        css={css(theme.inputs.name)}
                    />
                    <label
                        htmlFor="passwordInput"
                        style={{ justifySelf: "end" }}>
                        Пароль:
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        onChange={credentialsChange}
                        value={credentials.password}
                        id="passwordInput"
                        css={css(theme.inputs.name)}
                    />

                </div>
                {inOut.incorrectPasswordOrEmail ?
                    <small css={css({ color: "red" })}>Не верный логин или пароль</small>
                    : undefined}

                <div css={css({ display: "flex", gap: "3rem", alignItems: "center" })}>
                    <button
                        type="submit"
                        disabled={!credentials.email || !credentials.password}
                        css={css(theme.buttons.primary)}
                    >Войти </button>

                    <NavLink to="/registration" css={css(theme.navLinks.pageNavLink)}>Регистрация</NavLink>
                </div>
            </form>
        }


    </section>;
}

export const InOut = observer(_InOut);
