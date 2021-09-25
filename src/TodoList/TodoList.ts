import { makeObservable, observable, computed, action } from "mobx"

export class Todo {
    readonly id = Math.random().toString();

    finished = false;

    constructor(public title: string) {
        makeObservable(this, {
            title: observable,
            finished: observable,
            toggle: action.bound
        })
    }

    toggle() {
        this.finished = !this.finished
    }

}

export class TodoList {

    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }

    constructor(public todos: Todo[] = []) {
        makeObservable(this, {
            todos: observable,
            unfinishedTodoCount: computed,
            addTodo: action.bound
        })
    }

    addTodo() {
        this.todos.push(new Todo(`todo ${(this.todos.length + 1).toString()}`))
    }
}

