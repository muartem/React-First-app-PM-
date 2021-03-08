import axios from "axios";

export default class API {

    static #api = axios.create({
        baseURL: 'https://jsonplaceholder.typicode.com/',
    })

    static getUsers = async () => {
        const {data}  = await API.#api.get('/users')
        return data
    }

    static getTodos = async (id) => {
        const {data} = await this.#api.get(`/todos?userId=${id}`)
        return data
    }

    static addTodo = async (todo) => {
        const { data } = await this.#api.post('/todos', todo)
        return data
    }

    static deleteTodo = async (id) => {
        await this.#api.delete(`/todos/${id}`)
    }

    static updateTodo = async (id, status) => {
        const { data } = await this.#api.patch(`/todos/${id}`, {
            completed: status,
        })
        return data
    }

}
