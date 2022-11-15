import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const DarkModeContext = createContext(null)

export function DarkModeProvider({children}){
    console.log(children)
    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () =>{
        setDarkMode((darkMode)=>{return !darkMode})
        updateDarkMode(!darkMode)
    }

    //로컬스토리지 데이터 읽어오기
    useEffect(()=>{ //boolean
        const isDark = 
        localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches)

        setDarkMode(isDark) //리액트 내부 스테이트에 먼저 업데이트해주고
        updateDarkMode(isDark) // 우리 웹페이지에 다크모드인지 아닌지 부가적으로 업데이트
    },[])

    return <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
        {children}
        </DarkModeContext.Provider>
}
function updateDarkMode(darkMode){
    if(darkMode){
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    }else{
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
}
export const useDarkMode = ()=> useContext(DarkModeContext)