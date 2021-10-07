import React, { useState } from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _InOut: React.FC = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const theme = useTheme();
    const inOut = useRemote().inOut;

    const credentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const logIn = () => {
        inOut.logIn(credentials);
    }

    return <section css={css(theme.sections.common)}>
        <h2>Вход-выход</h2>
        <form css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
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
            <div css={css({ display: "flex", gap: "1rem" })}>
                <button
                    type="submit"
                    css={css(theme.buttons.primary)}
                >Войти </button>

                <button
                    css={css(theme.buttons.primary)}
                    onClick={inOut.logOut}
                >Выйти </button>

            </div>
        </form>

    </section>;
}

export const InOut = observer(_InOut);
