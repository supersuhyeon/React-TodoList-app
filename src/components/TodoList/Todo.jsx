import {GiTrashCan} from 'react-icons/gi'

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
        <li>
            <input type="checkbox" id='checkbox' checked={status === 'completed'} onChange={handleChange}/>
            {/* status가 completed이면 checked를 해라 */}
            <label htmlFor="checkbox">{text}</label>
            <button onClick={handleDelete}><GiTrashCan></GiTrashCan></button>
        </li>
    )
}