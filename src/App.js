import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import AskQuestion from './components/AskQuestion';
import ViewQuestion from './components/ViewQuestion';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-question" element={<AskQuestion/>} />
      <Route path="/question/:id" element={<ViewQuestion/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
