import React from 'react';
import s from './Column.module.css';
import Task from "../Task/Task";
import cardS from '../Task/Task.module.css';
import classnames from 'classnames';


export default class Column extends React.Component {
    static dragID = ""
    static dropID = ""

    constructor(props) {
        super(props)
        this.state ={
            add: false,
            edit: false,
            input: "",
            color: this.props.color || "#FFFFFF22"
        }
        this.inputColor = this.state.color

        this.addSwitch = this.addSwitch.bind(this)
        this.onInputT = this.onInputT.bind(this)
        this.onInputC = this.onInputC.bind(this)
        this.onDrop = this.onDrop.bind(this)
        this.addTask = this.addTask.bind(this)
        this.enterHandle = this.enterHandle.bind(this)
        this.editSwitch = this.editSwitch.bind(this)
        this.editCat = this.editCat.bind(this)
    }
    onInputT(e){
        this.setState( state => ({
            ...state,
            input: e.target.value
        }))
    }
    onInputC(e){
        this.inputColor = e.target.value
    }
    addSwitch(){
        this.setState( state => ({
            ...state,
            add: !state.add,
            edit: false
        }))
    }
    editSwitch(){
        this.setState( state => ({
            ...state,
            add: false,
            edit: !state.edit,
            input: this.props.title
        }))
    }

    addTask(){
        const {input} = this.state
        const {title, addNewTask} = this.props
        if (!input) return
        addNewTask(input, title)
        this.setState( state => ({
            ...state,
            add: false,
            input: ""
        }))
    }

    editCat(){
        const {input} = this.state
        const {title, editCategory} = this.props
        if (!input) return
        if (input !== title){
            editCategory(input, title)
        }

        this.setState( state => ({
            ...state,
            edit: false,
            input: "",
            color: this.inputColor+"22"
        }))
    }

    enterHandle(e, inputSwitch){
        if(e.key === "Enter") {
            switch (inputSwitch){
                case "E": {
                    this.editCat()
                    return
                }
                case "A":
                    this.addTask()
                    return
                default: return
            }

        }
    }


    dragOver(e) {
        e.preventDefault()
        if(e.target.classList.contains(s.column)){
            e.target.style.border = "dashed 2px gray"
            Column.dropID = e.target.id
        }
    }
    dragLeave(e) {
        e.target.style.border = "none"
    }
    onDrop(e) {
        e.target.style.border = "none"
        console.log(Column.dropID)
        this.props.changeCategory(Column.dropID, Column.dragID)
        Column.dragID = "";
    }

    getDropId = (id) => {
        Column.dragID = id
    }

    render() {
        const { addSwitch, colorI, onInputT, onInputC, addTask, editCat, enterHandle, editSwitch, getDropId} = this
        const {add, edit, input, color} = this.state
        const {title, items, editRatio, editTask, deleteTask} = this.props
        return (
            <div
                id={title}

                onDragOver={(e) => this.dragOver(e)}
                onDragLeave={(e) => this.dragLeave(e)}
                onDrop={(e) => this.onDrop(e)}

                style={{backgroundColor: color}} className={s.column}>
                <header className={classnames({ 'hidden': edit })}>
                    <h2 className={s.title} >{title}</h2>
                    <h2> {items.length}</h2>
                    <div className={s.edit} onClick={editSwitch}>&#10000;</div>
                </header>

                <header className={classnames({ 'hidden': !edit })}>
                    <h2  className={s.title}>
                        <input
                            autoFocus
                            type="text"
                            onKeyPress={(e) => enterHandle(e, "E")}
                            onChange={(e) => onInputT(e)}
                            value={input}
                            maxLength="50"/>
                    </h2>
                    <input  value={colorI} type="color" onInput={(e) => onInputC(e) }/>
                    <div className={s.done} onClick={editCat}>&#10004;</div>
                </header>

                <div className={s.taskList}>
                {items.sort((a,b) => b.ratio - a.ratio ).map(i =>
                    <Task
                        key={i.date}
                        title={i.title}
                        ratio={i.ratio}
                        date={i.date}
                        board ={title}
                        editRatio={editRatio}
                        editTask={editTask}
                        deleteTask={deleteTask}
                        getDropId={getDropId}
                    />
                )}
                </div>
                <div className={classnames(cardS.task, s.add, { 'hidden': add }) } onClick={addSwitch}>+</div>
                <div className={classnames(cardS.task, s.add, s.addarea, { 'hidden': !add })}>
                    <input type="text"
                           autoFocus
                           onKeyPress={(e) => enterHandle(e, "A")}
                           onChange={(e) => onInputT(e)}
                           value={input}
                           maxLength="50"/>
                    <div onClick={addTask}>+</div>
                </div>
            </div>
        )
    }
}
