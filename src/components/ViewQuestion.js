import React from 'react'
import Sidebar from './Sidebar';
import MainQuestion from './MainQuestion';
import './Home.css';

function ViewQuestion() {
  return (
    <div className="stack-body">
    <Sidebar/>
    <MainQuestion/>
    </div>
  )
}

export default ViewQuestion