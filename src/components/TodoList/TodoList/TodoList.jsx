import { useEffect } from "react"
import { useState } from "react"
import AddTodo from "../AddTodo/AddTodo"
import Todo from "../Todo/Todo"
import styles from './TodoList.module.css'
import {VscDebugRestart} from 'react-icons/vsc'


export default function TodoList({filter}){
    const [todos, setTodos] = useState(()=>{return readTodosFromLocalStorage()})

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos)) //setItem todos 키에 오브젝트를 저장
    },[todos])


    const handleAdd = (todo)=>{
        //새로운 투두를 todos업데이트를 해야한다.
        setTodos((todos)=>{return [...todos, todo]})
    }

    const handleUpdate = (update)=>{
        setTodos(todos.map((t)=> t.id === update.id ? update : t))
    }

    const handleDelete = (deleted)=>{
        setTodos(todos.filter((t) => t.id !== deleted.id))
    }

    const AllHandleDelete = ()=>{
        setTodos(()=>{return []})
    }

    const filtered = getFilteredItems(todos, filter)

    return(
        <section className={styles.container}>
        <button className={styles.reset} onClick={AllHandleDelete}>
            <VscDebugRestart></VscDebugRestart>
            </button>
        <ul className={styles.list}>
        {filtered.map((item)=>{return <Todo key={item.id} 
        todo={item} 
        onUpdate={handleUpdate} 
        onDelete={handleDelete}></Todo>})}
        </ul>
        <AddTodo onAdd={handleAdd}></AddTodo>
      </section>
    )
}

function getFilteredItems(todos,filter){
    if(filter === 'all'){
        return todos;
    }
    return todos.filter(todo => todo.status === filter)
}

function readTodosFromLocalStorage(){
   
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
}