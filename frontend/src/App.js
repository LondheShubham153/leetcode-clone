import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Login from './components/Login';
import {Routes, Route} from 'react-router-dom'
import Signup from './components/Signup';
import Problems from './components/Problems';
import Solveproblem from './components/Solveproblem';
function App() {
  useEffect(()=>{
    // axios.get('http://127.0.0.1:8000/user/login').then(res=>{
    //   console.log(res)
    // })
  },[])
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="signup" element={<Signup/>} />
        <Route exact path="problems" element={<Problems/>} />
        <Route exact path="solve/:id" element={<Solveproblem/>} />
      </Routes>
      
    </>
  );
}

export default App;
