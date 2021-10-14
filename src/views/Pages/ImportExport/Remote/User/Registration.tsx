import React, { useState } from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const init = { username: '', email: '', password: '' };
const _Registration: React.FC = () => {
    const [credentials, setCredentials] = useState(init);
    const theme = useTheme();
    const inOut = useRemote().inOut;

    const credentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inOut.setIncorrectPasswordOrEmail(false);
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const clearInput = () => {
        setCredentials(init);
    }

    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inOut.register(credentials)
            .then(alert)
            .then(clearInput);
    }

    return <div css={css(theme.divs.commonPage)}> <section css={css(theme.sections.common)}>
        <h2>Создание новой учётной записи</h2>
        <form
            css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
            onSubmit={register}
        >
            <div css={css(theme.divs.params)}>
                <label
                    htmlFor="userNameInput"
                    style={{ justifySelf: "end" }}>
                    Имя:
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Введите ник пользователя"
                    onChange={credentialsChange}
                    value={credentials.username}
                    id="userNameInput"
                    css={css(theme.inputs.name)}
                />
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
            {inOut.incorrectPasswordOrEmail &&
                <small css={css({ color: "red" })}>Не верный логин или пароль</small>}

            <div css={css({ display: "flex", gap: "3rem", alignItems: "center" })}>
                <button
                    type="submit"
                    disabled={!credentials.email || !credentials.password}
                    css={css(theme.buttons.primary)}
                >Создать пользователя </button>
            </div>
        </form>
    </section></div>;
}

export const Registration = observer(_Registration);
