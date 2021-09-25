import React from 'react';
import { TodoListViewStyledObserver } from './TodoListView';
import { TodoList, Todo } from './TodoList'

// import { Meta } from '@storybook/react/types-6-0';

// export default {
//   title: 'mobx/TodoList',
//   component: TodoListViewStyledObserver,
// } as Meta;


const todoTitles = [
  "Do1",
  "Do2",
];

const todoList = new TodoList(todoTitles.map(t => new Todo(t)));

export const TodoListViewStyledObserver1 = () => <TodoListViewStyledObserver todoList={todoList} />;