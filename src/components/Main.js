import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import './Main.css';
import AllQuestions from './AllQuestions';
import axios from "axios";
import {API} from  './global.js';

function Main() {

    const [questions, setquestions] = useState([]);

    useEffect(() => {
        getquestions();
      }, []);
    
      const getquestions = () => {
        axios.get(`${API}/questions`).then((res) => {
          if (res.status === 401) {
            console.log("Data Not Found");
          }
          console.log(res.data);
          setquestions(res.data);
        });
      };

  return (
    <div className="main">
        <div className="main-container">
            <div className="main-top">
                <h2>All Questions</h2>
                <Link to="/add-question">
                    <button>Ask Question</button>
                </Link>
            </div>
            <div className="main-desc">
                <p>{questions ? questions.length: 0} questions</p>
                <div className="main-filter">
                    <div className="main-tabs">
                        <div className="main-tab">
                            <Link to="/">Newest</Link>
                        </div>
                        <div className="main-tab">
                            <Link to="/">Active</Link>
                        </div>
                        <div className="main-tab">
                            <Link to="/">More</Link>
                        </div>
                    </div>
                    <div className="main-filter-item">
                        <FilterListIcon/>
                        <p>Filter</p>
                    </div>
                </div>
            </div>
            <div className="questions">
                {/* <AllQuestions/> */}
                {questions.map((item) => {
                    return (
                        <AllQuestions
                        key={item._id}
                        value={item}
                        />
                    );
                })}     
            {/* {questions?.map((_q) => (
            <div className="question">
              <AllQuestions data={_q} />
            </div>
          ))} */}

            </div>
        </div>
    </div>
  )
}

export default Main