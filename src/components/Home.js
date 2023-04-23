import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Main from './Main';


function Home() {
  return (
    <div className="stack-body">
     <Sidebar/>
     <Main/>
     </div>
  )
}

export default Home