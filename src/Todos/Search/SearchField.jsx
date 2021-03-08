import React from 'react';
import s from "../TodoList/Todos.module.css";

const  SearchField = ({ searchTodo }) => {
    const [input, setInput] = React.useState("");

    const enterHandle = (e) => {
        if(e.key === "Enter") {
            search()
            e.target.blur()
        }
    }

    const search = () => {
        if (!input) return
        searchTodo(input)
//        setInput("")
    }

    return (
        <div className={s.onlyLog}>
            <input
                placeholder="Search..."
                value={input}
                onInput={(e) => setInput(e.target.value)}
                onKeyPress={(e) => enterHandle(e)}
            />
            <div onClick={search} className={s.btn}><i className="fa fa-search fa-lg" /></div>
        </div>
    )
}

export default SearchField
