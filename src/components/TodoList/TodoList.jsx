import { useState } from "react"
import AddTodo from "./AddTodo"
import Todo from "./Todo"


export default function TodoList({filter}){
    const [todos, setTodos] = useState([{id:1, text:'장보기', status:'active'},{id:2, text:'공부하기', status:'active'}])
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

    const filtered = getFilteredItems(todos, filter)

    return(
        <section className="App">
        <ul>
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