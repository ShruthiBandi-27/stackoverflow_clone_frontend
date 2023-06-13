import { Avatar } from '@mui/material'
import React from 'react'
import './AllQuestions.css';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

function AllQuestions({key, value}) {
  return (
    <div className="all-questions">
        <div className="all-questions-container">
            <div className="all-questions-left">
                <div className="all-options">
                    <div className="all-option">
                        <p>0</p>
                        <span>votes</span>
                    </div>
                    <div className="all-option">
                        <p>0</p>
                        <span>answers</span>
                    </div>
                    <div className="all-option">
                        <p>2</p>
                        <small> views</small>
                    </div>
                </div>
            </div>
            <div className="question-answer">
                {/* <Link to={`/question?id=${value._id}`}>{value.title}</Link> */}
                <Link to={`/question/${value._id}`}>{value.title}</Link>
                <div style={{maxWidth: "90%"}}>
                 {/* //HTML parser */}
                 {/* {value.body} */}
                 <div>{parse(value.body)}</div>
                </div>
                <div  style={{display: "flex"}}>
                {value.tags && value.tags.map((tag) => (
                        <p
                         style={{
                            margin: "10px 5px",
                            padding: "5px 10px",
                            backgroundColor: "#007cd446",
                            borderRadius: "3px",
                    }}
                         >
                        {tag}
                        </p>
                    )) 
                }


                </div>
            </div>
            <div className="author">
                <div className="auth-details">
                    <Avatar/>
                    <p>Shruthi</p>
                    <small>{new Date(value.created_at).toLocaleString()}</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllQuestions