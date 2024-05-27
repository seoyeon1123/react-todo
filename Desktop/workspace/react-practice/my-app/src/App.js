import Home from './pages/Home';
import About from './pages/About';
import Count from './pages/counter';
import TodoList from './pages/TodoList/TodoList';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |
        <Link to="/count">Count</Link> | <Link to={'/TodoList'}>TodoList</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/count" element={<Count />} />
        <Route path="/TodoList" element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
