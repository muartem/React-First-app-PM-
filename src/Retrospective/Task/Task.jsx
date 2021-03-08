import React from 'react';
import s from './Task.module.css';
import classnames from 'classnames';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            edit: false,
            input: "",
        }


        this.enterHandle = this.enterHandle.bind(this)
        this.onInputT = this.onInputT.bind(this)
        this.editSwitch = this.editSwitch.bind(this)
        this.editTaskName = this.editTaskName.bind(this)
    }


    onInputT(e){
        this.setState( state => ({
            ...state,
            input: e.target.value
        }))
    }

    editSwitch(){
        this.setState( state => ({
            ...state,
            edit: !state.edit,
            input: this.props.title
        }))
    }

    editTaskName(){
        const {input} = this.state
        const {date, editTask} = this.props
        if (!input) return
        editTask(input, date)
        this.setState( state => ({
            ...state,
            edit: false,
            input: ""
        }))
    }

    enterHandle(e){
        if(e.key === "Enter") {
            this.editTaskName()
        }
    }

    dragStart = (e) => {
        setTimeout(()=>{
            e.target.classList.add("hidden")
        }, 0)
        this.props.getDropId(e.target.id)
    }
    dragEnd = (e) => {
        e.target.classList.remove("hidden")
    }


    render() {
        const {title, ratio, date, editRatio, deleteTask} = this.props
        const {edit, input} = this.state
        const {editSwitch,onInputT, editTaskName, enterHandle, dragEnd, dragStart} = this
        let humanDate = (new Date(date)).toLocaleString()
        return (
            <div
                id={date}
                data-board={title}
                draggable="true"
                className={s.task}

                onDragStart={(e) => dragStart(e)}
                onDragEnd={(e) => dragEnd(e)}

            >
                <header>
                    <p className={classnames(s.title, {'hidden': edit})}>{title}</p>
                    <input
                        autoFocus
                        onKeyPress={(e) => enterHandle(e)}
                       className={classnames({'hidden': !edit})}
                       onInput={(e) => onInputT(e)}
                       value={input}
                       type="text"
                    />
                    <div className={classnames(s.edit, {'hidden': edit})} onClick={editSwitch}>&#10000;</div>
                    <div className={classnames(s.done, {'hidden': !edit})} onClick={() => editTaskName() }>&#10004;</div>
                    <div className={classnames(s.del, {'hidden': !edit})} onClick={() => deleteTask(date)}>&#10008;</div>
                </header>
                <span>{humanDate}</span>
                <div className={s.ratio}>
                    <div onClick={() => editRatio(ratio-1,date)} className={s.min}>-</div>
                    <div>{ratio}</div>
                    <div onClick={() => editRatio(ratio+1,date)} className={s.max}>+</div>
                </div>
            </div>
        )
    }

}
