import React from 'react';
import s from './Board.module.css';
import Column from "../Column/Column";
import Config from "./../Config"

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [...Config]
        }

        this.groupBy = this.groupBy.bind(this)
        this.addTask = this.addTask.bind(this)
        this.delTask = this.delTask.bind(this)
        this.editRatio = this.editRatio.bind(this)
        this.editTask =this.editTask.bind(this)
        this.editCategory = this.editCategory.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
    }

    groupBy(Objects, field) {
        return Objects.reduce((acc, item) => {
            acc[item[field]] = acc[item[field]] || []
            acc[item[field]].push(item)
            return acc
        }, {})
    }

    addTask(title, category){
        this.setState( state => ({
            ...state,
            tasks: [...state.tasks, {
                "title": title,
                "date": Date.now(),
                "ratio": 0,
                "category": category
            }]

            /*let { tasks } = state
            tasks.push({
                "title": "task8",
                "date": Date.now(),
                "ratio": 0,
                "category": "Non - Action items"
            })
            return tasks*/

            // Закоменчен код вставляет вместо одной карточки сразу две(
        }))
    }

    delTask(id){
        this.setState( state => {
            const tasksWithOut =  state.tasks.filter(t => t.date !== id)
            return{
                ...state,
                tasks: tasksWithOut
            }})
    }

    editRatio(newRatio, id){
        this.setState( state => {
            const tasksWithNewRatio =  state.tasks.map(t => {
                if (t.date === id) t.ratio = newRatio
                return t
            })
            return{
                ...state,
                tasks: tasksWithNewRatio
            }})
    }

    editTask(newTask, id){
        this.setState( state => {
            const tasksWithNewName =  state.tasks.map(t => {
                if (t.date === id) t.title = newTask
                return t
            })
            return{
                ...state,
                tasks: tasksWithNewName
            }})

    }

    editCategory(newCat, oldCat){
        this.setState( state => {
            const tasksWithNewCat = state.tasks.map(t => {
                if (t.category === oldCat) t.category = newCat
                return t
            })

            return{
            ...state,
            tasks: [...tasksWithNewCat]
        }})
    }

    changeCategory(newCat, id){
        this.setState( state => {
            const tasksWithNewCat =  state.tasks.map(t => {
                if (t.date.toString() === id.toString()) t.category = newCat
                return t
            })
            return{
                ...state,
                tasks: tasksWithNewCat
            }})
    }

    render() {
        const {tasks} = this.state
        const {groupBy, addTask, editCategory, changeCategory ,editTask, editRatio, delTask} = this
        const categories = groupBy(tasks, 'category')
        return (
            <div className={s.board}>
                <h1>Team retrospective
                <div className={s.add} onClick={() => addTask("New Task", "new")}>+</div>
                </h1>
                <div className={s.columns}>
                    {Object.keys(categories).map((c) =>
                        <Column key={c} title={c} items={categories[c]}
                                addNewTask={addTask}
                                editRatio={editRatio}
                                editTask={editTask}
                                deleteTask={delTask}
                                editCategory={editCategory}
                                changeCategory={changeCategory}
                        />
                    )}
                </div>
            </div>
        )
    }
}
