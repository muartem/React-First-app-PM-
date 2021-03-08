import React from 'react';
import classnames from 'classnames/bind';

import API from "../API";

import s from './Todos.module.css';

import TodoItem from "../TodoItem/TodoItem";
import SelectField from "../Select/SelectField";
import AddField from "../Add/AddField";
import SearchField from "../Search/SearchField";


export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            todos: [],
            currentUser: "",
            searchKey: ""
        }
    }

    componentDidMount() {
        this.getUsers()
        //this.getTodos(1)
    }

    getUsers = async () => {
        const users = await API.getUsers()
        this.setState(state =>({
            ...state,
            users: [...users]
        }))
    }

    getTodos = async (id) => {
        const todos = await API.getTodos(id)
        this.setState(state =>({
            ...state,
            todos: [...todos],
            searchKey: ""
        }))
    }

    addTodo = async (title) => {
        const {currentUser, todos} = this.state
        if(todos.find(t => t.title.toLowerCase().includes(title.toLowerCase()))) return
        const todo = {
            title,
            userId: currentUser,
            completed: false,
            id: todos.length + 1,
        }

        await API.addTodo(todo)

        this.setState((state) => ({
            ...state,
            todos: [...state.todos, todo],
            searchKey: ""
        }));
    }

    deleteTask = (id) =>{
        const todos = this.state.todos.filter(t => t.id !== id)
        this.setState(state =>({
            ...state,
            todos: [...todos]
        }))
    }

    setSearchKey = (key) =>{
        this.setState(state =>({
            ...state,
            searchKey: key
        }))
    }

    render() {
        const {getTodos, deleteTask, addTodo, setSearchKey} = this
        const {users, todos, searchKey} = this.state
        return(
            <div className={classnames.bind(s)({unlog: todos.length === 0})}>
                <header className={classnames("container-fluid", s.header)}>
                    <SelectField users={users} selectUser={getTodos}/>
                    <AddField addTodo={addTodo}/>
                    <SearchField searchTodo={setSearchKey} />
                </header>
                <div className={s.list}>
                    <ul>
                        {todos.reverse().map((t) => <TodoItem
                            key={t.userId+'::'+t.id}
                            id ={t.id}
                            title={t.title}
                            searchKey = {searchKey}
                            status={t.completed}
                            delete={deleteTask}/>)}
                    </ul>
                </div>
            </div>
        )
    }


}
