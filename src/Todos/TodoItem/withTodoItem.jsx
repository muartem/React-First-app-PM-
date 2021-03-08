import React  from 'react'

import API from "../API";


const withTodoItem = (Component) => class extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            status: this.props.status
        }
    }

    update = (id) => {
        API.updateTodo(id, !this.state.status).then(() => {
                this.setState((state) => ({
                    ...state,
                    status: !state.status
                }))
            }
        )
    }

    select = (title, key) => {
        if (!key || key.length < 3) return undefined
        const keyReg = new RegExp(`\\b${key}`)
        const replacer = title.replace(keyReg, '<b>' + key+ '</b>')
        return replacer
    }

    deleteItem = (id) => {
        API.deleteTodo(id).then(()=> {
                this.props.delete(id)
            }
        )
    }

    render() {
        const {props, state, select, update, deleteItem} = this
        return(
            <Component
                {...props}
                status={state.status}
                select={select}
                update={update}
                deleteItem={deleteItem}
            />)
    }
}


export default withTodoItem
