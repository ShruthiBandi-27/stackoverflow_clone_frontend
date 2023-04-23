import { Avatar } from '@mui/material'
import React from 'react'
import './AllQuestions.css';
import { Link } from "react-router-dom";


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
                        <p>0</p>
                        <small> 2views</small>
                    </div>
                </div>
            </div>
            <div className="question-answer">
                <Link to="/question">{value.title}</Link>
                <div style={{maxWidth: "90%"}}>
                 {/* //HTML parser */}
                 I need to make user cards where on clicking the follow button it changes color and name and adds 1 to following. I receive such users from API , 12 users, and I need to be able to choose more than 1 ...
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
                    <small>{value.created_at}</small>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllQuestions