import React from 'react'
import classNames from 'classnames/bind'

import withTodoItem from "./withTodoItem";

import s from './TodoItem.module.css'

const TodoItem = ({ title, id, status, searchKey, select, update, deleteItem}) => (
    <li className={classNames.bind(s)({
        item: true,
        done: status
    })}>
        <div className={s.chekBox} onClick={() => update(id)}>&#10003;</div>
        <p className={s.title} dangerouslySetInnerHTML={{__html: select(title, searchKey) || title}}/>
        <div className={s.del} onClick={() => deleteItem(id)} >&#10008;</div>
    </li>
)

export default withTodoItem(TodoItem)
