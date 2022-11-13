export default function Header({filter, filters, onFilterChange}){
    return(
        <header>
            <ul>
                {filters.map((value, index)=>{return <li key={index}>
                    <button onClick={()=>{return onFilterChange(value)}}>{value}</button>
                </li>})}
            </ul>
        </header>
    )
}