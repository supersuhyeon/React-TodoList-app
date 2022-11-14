
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

    return(
        <li className={styles.todo}>
            <input className={styles.checkbox} type="checkbox" id={todo.id} checked={status === 'completed'} onChange={handleChange}/>
            {/* status가 completed이면 checked를 해라 */}
            <label className={styles.text} htmlFor={todo.id}>{text}</label>
           <span className={styles.icon}>
            <button className={styles.button} onClick={handleDelete}><FaTrashAlt></FaTrashAlt>
            </button>
           </span>
        </li>
    )
}