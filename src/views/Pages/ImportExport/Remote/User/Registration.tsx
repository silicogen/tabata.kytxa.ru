import React, { useState } from "react";
import { css } from "@styled-system/css";
import { useTheme } from "css/theme";
import { useRemote } from "store/Remote";
import { observer } from "mobx-react-lite";

const init = { username: '', email: '', password: '' };
const _Registration: React.FC = () => {
    const [user, setUser] = useState(init);
    const theme = useTheme();
    const inOut = useRemote().inOut;
    const [response, setResponse] =
        useState<{ status?: number, error?: any, response?: any }>({});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setResponse({});
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        inOut.register(user)
            .then(setResponse)
    }

    return <div css={css(theme.divs.commonPage)}> <section css={css(theme.sections.common)}>
        <h2>Создание новой учётной записи</h2>
        <form
            css={css(theme.divs.params)}
            onSubmit={onSubmit}
        >
            <label
                htmlFor="userNameInput"
                css={css(theme.layout.params.label)}>
                Имя:
            </label>
            <input
                type="text"
                name="username"
                placeholder="Введите ник пользователя"
                onChange={onChange}
                value={user.username}
                id="userNameInput"
                css={css({ ...theme.inputs.name, ...theme.layout.params.content })}
            />
            {response.error?.Taken_username &&
                <small css={css(theme.layout.params.errorMessage)}
                >Пользователь с таким именем уже существует</small>}


            <label
                htmlFor="loginInput"
                css={css(theme.layout.params.label)}>
                Логин:
            </label>
            <input
                type="email"
                name="email"
                placeholder="Введите email"
                onChange={onChange}
                value={user.email}
                id="loginInput"
                css={css({ ...theme.inputs.name, ...theme.layout.params.content })}
            />
            {response.error?.Taken_email &&
                <small css={css(theme.layout.params.errorMessage)}
                >Данный адрес электронной почты уже используется в качестве логина</small>}


            <label
                htmlFor="passwordInput"
                css={css(theme.layout.params.label)}>
                Пароль:
            </label>
            <input
                type="password"
                name="password"
                placeholder="Введите пароль"
                onChange={onChange}
                value={user.password}
                id="passwordInput"
                css={css(theme.inputs.name)}
            />
            {response.error?.Taken_email &&
                <small css={css(theme.layout.params.errorMessage)}
                >Пароль должен содержать минимум 6 символов
                </small>}


            <button
                type="submit"
                disabled={!user.email || !user.password}
                css={css({ ...theme.layout.params.submitButton, ...theme.buttons.primary })}
            >Создать пользователя </button>


            {response.status == 201 &&
                <small css={css(theme.layout.params.successMessage)}
                >Пользователь создан
                </small>}
        </form>
    </section></div>;
}

export const Registration = observer(_Registration);
