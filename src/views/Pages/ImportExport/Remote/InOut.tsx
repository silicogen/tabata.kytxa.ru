import React from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const _InOut: React.FC = () => {
    const theme = useTheme();
    const inOut = useRemote().inOut;

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inOut.setEmail(e.target.value)
    }
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inOut.setPassword(e.target.value)
    }
    return <section css={css(theme.sections.common)}>
        <h2>Вход-выход</h2>
        <form css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
            onSubmit={inOut.logIn}
        >
            <div css={css(theme.divs.params)}>
                <label
                    htmlFor="loginInput"
                    style={{ justifySelf: "end" }}>
                    Логин:
                </label>
                <input
                    type="email"
                    placeholder="Введите email"
                    onChange={emailChange}
                    value={inOut.email}
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
                    placeholder="Введите пароль"
                    onChange={passwordChange}
                    value={inOut.password}
                    id="passwordInput"
                    css={css(theme.inputs.name)}
                />
            </div>
            <div css={css({ display: "flex", gap: "1rem" })}>
                <button
                    type="submit"
                    css={css(theme.buttons.primary)}
                >Войти </button>

            </div>
        </form>

    </section>;
}

export const InOut = observer(_InOut);
