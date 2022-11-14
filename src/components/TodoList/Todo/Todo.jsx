
import { useEffect } from 'react';
import { useRef } from 'react';
import {FaTrashAlt} from 'react-icons/fa'
import styles from './Todo.module.css'

export default function Todo({todo, onUpdate, onDelete}){
    const {text, status} = todo;

    const handleChange = (e)=>{
        const status = e.target.checked ? 'completed' : 'active' ; 
        onUpdate({...todo, status: status})
    }
    const handleDelete = ()=>{
        onDelete(todo)
    }

    const todoRef = useRef()

    useEffect(()=>{
        todoRef.current.scrollIntoView({behavior: 'smooth', block:'end'})
    },[todo])

    return(
        <li className={styles.todo} ref={todoRef}>
            <input className={styles.checkbox} type="checkbox" id={todo.id} checked={status === 'completed'} onChange={handleChange}/>
            {/* status가 completed이면 checked를 해라. input과 label묶기 id와 htmlFor은 서로 연결되어있다 */}
            <label className={styles.text} htmlFor={todo.id}>{text}</label>
           <span className={styles.icon}>
            <button className={styles.button} onClick={handleDelete}><FaTrashAlt></FaTrashAlt>
            </button>
           </span>
        </li>
    )
}