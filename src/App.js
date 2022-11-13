import './App.css';
import React, { useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import Header from './components/TodoList/Header';


const filters = ['all', 'active', 'completed'] 

function App() {
  const [filter, setFilter] = useState(filters[0])

  return (
    <>
    <Header filters={filters} filter={filter} onFilterChange={filter => setFilter(filter)}></Header>
    <TodoList filter={filter}></TodoList>
    </>
  );
}

export default App;
