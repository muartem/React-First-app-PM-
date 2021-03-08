import React, {Component} from 'react';
import s from "../TodoList/Todos.module.css";

class SelectField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        }
    }


    onInputT = (e) => {
        this.setState( state => ({
            ...state,
            input: e.target.value
        }))
    }

    select = () => {
        const {input} = this.state
        const {selectUser, users} = this.props
        const user = users.find(u => u.name.toLowerCase().includes(input.toLowerCase()))
        if (!input || !user) return
        selectUser(user.id)
    }

    enterHandle = (e) => {
        if(e.key === "Enter") {
            this.select()
            e.target.blur()
        }
    }

    render() {
        const {onInputT, enterHandle, select} = this
        const {users} = this.props
        return (
            <div>
                <input
                    list="select"
                    placeholder="Choose an User"
                    value={this.state.input}
                    onInput={(e) => onInputT(e)}
                    onKeyPress={(e) => enterHandle(e)}
                />
                <datalist id="select">
                    {users.map(u => <option key={u.id} value={u.name}/>)}
                </datalist>
                <div className={s.btn} onClick={select} ><i className="fa fa-sign-in fa-lg" /></div>
            </div>
        );
    }
}

export default SelectField;
