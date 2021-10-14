import React, { useState } from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";
import { Redirect } from "react-router-dom";

const _Profile: React.FC = () => {
    const theme = useTheme();
    const inOut = useRemote().inOut;

    const [user, setUser] = useState({
        email: inOut.currentUser?.email,
        current_password: '',
        new_password: '',
    })

    const clearInput = () => {
        setUser({
            ...user,
            current_password: "",
            new_password: ""
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inOut.updateUser({
            email: user.email!,
            current_password: user.current_password,
            new_password: user.new_password
        })
            .then(alert)
            .then(clearInput);
    }

    const deleteUser = (e: any) => {
        e.preventDefault();
        if (confirm(`Удалить пользователя ${inOut.currentUser?.username} ?`)) {
            inOut.deleteUser().then(alert);
        }
    }

    if (!inOut.isAuthenticated) {
        return <Redirect to="/login" />
    }

    return <div css={css(theme.divs.commonPage)}><section css={css(theme.sections.common)}>
        <h2>Изменение или удаление профиля пользователя</h2>
        <form
            css={css({ display: "flex", flexFlow: "column", alignItems: "start", gap: "1rem" })}
            onSubmit={updateUser}
        >
            <div css={css(theme.divs.params)}>
                <label
                    htmlFor="userNameInput"
                    style={{ justifySelf: "end" }}>
                    Текущий пользователь:
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Введите ник пользователя"
                    disabled={true}
                    onChange={handleChange}
                    value={inOut.currentUser?.username}
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
                    onChange={handleChange}
                    value={user.email}
                    id="loginInput"
                    css={css(theme.inputs.name)}
                />

                <label
                    htmlFor="current_passwordInput"
                    style={{ justifySelf: "end" }}>
                    Текущий пароль:
                </label>
                <input
                    type="password"
                    name="current_password"
                    placeholder="Введите текущий пароль"
                    onChange={handleChange}
                    value={user.current_password}
                    id="current_passwordInput"
                    css={css(theme.inputs.name)}
                />

                <label
                    htmlFor="new_passwordInput"
                    style={{ justifySelf: "end" }}>
                    Новый пароль:
                </label>
                <input
                    type="password"
                    name="new_password"
                    placeholder="Введите новый пароль"
                    onChange={handleChange}
                    value={user.new_password}
                    id="new_passwordInput"
                    css={css(theme.inputs.name)}
                />

            </div>
            {inOut.incorrectPasswordOrEmail ?
                <small css={css({ color: "red" })}>Не верный логин или пароль</small>
                : undefined}

            <div css={css({ display: "flex", flexFlow: "column", gap: "3rem" })}>
                <button
                    type="submit"
                    disabled={!user.email || !user.current_password || !user.new_password}
                    css={css(theme.buttons.primary)}
                >Изменить пользователя </button>

                <button
                    css={css(theme.buttons.primary)}
                    onClick={deleteUser}
                >Удалить пользователя {inOut.currentUser?.username}
                </button>
            </div>
        </form>
    </section></div >

}

export const Profile = observer(_Profile);
