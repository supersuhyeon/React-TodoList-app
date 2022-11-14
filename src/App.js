import './App.css';
import React, { useState } from 'react';
import TodoList from './components/TodoList/TodoList/TodoList';
import Header from './components/TodoList/Header/Header';
import { DarkModeProvider } from './components/useContext/DarkModeContext';


const filters = ['all', 'active', 'completed'] 

function App() {
  const [filter, setFilter] = useState(filters[0])

  return (
    <>
    <DarkModeProvider>
    <Header filters={filters} filter={filter} onFilterChange={filter => setFilter(filter)}></Header>
    <TodoList filter={filter}></TodoList>
    </DarkModeProvider>
    </>
  );
}

export default App;
