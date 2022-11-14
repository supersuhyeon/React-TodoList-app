import styles from './Header.module.css'
import {MdDarkMode, MdLightMode} from 'react-icons/md'
import { useDarkMode } from '../../useContext/DarkModeContext'

export default function Header({filter, filters, onFilterChange}){
    const {darkMode, toggleDarkMode} = useDarkMode()
    const handleDarkMode = ()=>{toggleDarkMode()}

    return(
        <header className={styles.header}>
            <button onClick={handleDarkMode} className={styles.toggle}>
                {!darkMode && <MdDarkMode></MdDarkMode>}
                {darkMode && <MdLightMode></MdLightMode>}
            </button>
            <ul className={styles.filters}>
                {filters.map((value, index)=>{return <li  key={index}>
                    <button className={`${styles.filter} ${filter === value && styles.selected}`} onClick={()=>{return onFilterChange(value)}}>{value}</button>
                </li>})}
            </ul>
        </header>
    )
}