import React, {Component} from 'react';
import s from "../TodoList/Todos.module.css";

class AddField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        }

        this.inputField = React.createRef()
    }

    onInputT = (e) => {
        this.setState( state => ({
            ...state,
            input: e.target.value
        }))
    }

    add = () => {
        const {input} = this.state
        const {addTodo} = this.props

        if (!input) return
        addTodo(input)

        this.setState( state => ({
            ...state,
            input: ""
        }))

        this.inputField.current.focus()
    }

    enterHandle = (e) => {
        if(e.key === "Enter") {
            this.add()
        }
    }

    render() {
        const {onInputT, enterHandle, add, inputField} = this

        return (
            <div className={s.onlyLog}>
                <input
                    ref={inputField}
                    placeholder="What r u going to do?"
                    value={this.state.input}
                    onInput={(e) => onInputT(e)}
                    onKeyPress={(e) => enterHandle(e)}
                />
                <div onClick={add} className={s.btn}><i className="fa fa-plus fa-lg" /></div>
            </div>
        )
    }
}

export default AddField;

