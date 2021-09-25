import React from "react";
import { observer } from "mobx-react-lite";
import { Todo, TodoList } from "./TodoList";
import { css } from "../utils/css"

const TodoView = observer(
    ({ todo }: { todo: Todo }) =>
        <li style={{ color: todo.finished ? "green" : "palevioletred" }}>
            <input id={todo.id} type="checkbox" checked={todo.finished} onClick={todo.toggle} />
            <label htmlFor={todo.id}>{todo.title}</label>
        </li >
);

export const TodoListViewStyledObserver = observer(
    ({ todoList }: { todoList: TodoList }) =>
        <>
            <ul css={css({ listStyleType: ['none', 'disc', 'circle', 'square'] })}>
                {todoList.todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
            </ul>
            <button onClick={todoList.addTodo}>Add</button>
            <b style={{
                color: todoList.unfinishedTodoCount > 0 ? "red" : "green",
                display: "block"
            }}
            >Tasks left: {todoList.unfinishedTodoCount}</b>
        </>
);