import React, { useState, useEffect } from "react";
import './MainQuestion.css';
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {API} from  './global.js';
// import { useLocation } from 'react-router-dom';
import parse from 'html-react-parser';


function MainQuestion() {
  const [questionData, setQuestionData] = useState(null);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");

   const { id } = useParams();
   console.log(`useParams: ${JSON.stringify(useParams())}`)
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const id = searchParams.get('id');
  console.log(`ques_id: ${id}`);

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  useEffect(()=> {
    async function getQuestionDetails() {
      await axios
        .get(`${API}/question/${id}`)
        .then((res) => {
          console.log(`shruthi question details: ${JSON.stringify(res.data[0])}`)
          setQuestionData(res.data[0]);
          
        })
        .catch((err) => console.log(err))
    }
    getQuestionDetails();
  },[id]);

  console.log(`questionData: ${JSON.stringify(questionData)}`);
  const handleQuill = (value) => {
    setAnswer(value);
  };

  async function getUpdatedAnswer() {
    await axios
      .get(`${API}/question/${id}`)
      .then((res) => setQuestionData(res.data[0]))
      .catch((err) => console.log(err));
  }


  const handleComment = async () => {
    //alert("comment added");
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: "shruthi",
      };
      await axios.post(`${API}/comment/${id}`, body).then((res) => {
        //alert("comment added successfully");
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        // console.log(res.data);
      });
    }

    setShow(true)
  };

  const handleSubmit = async () => {
    //alert("answer posted");
    const body = {
      question_id: id,
      answer: answer,
      user: "shruthi",
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${API}/answer`, body, config)
      .then(() => {
       // alert("Answer added successfully");
        setAnswer("");
        getUpdatedAnswer();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{ questionData ? questionData.title: ""}</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>{new Date().toLocaleString()}</span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed
              <span>20 times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">{questionData && questionData.comments ? questionData.comments.length : 0}</p>
                <p className="arrow">▲</p>
                <BookmarkBorderIcon />
                <HistoryIcon />
              </div>
            </div>
          {/* </div> */}
          <div className="question-answer">
            {/* Parser */}
            <p>{ questionData ? parse(questionData.body): ""}</p>
            <div className="author">
              <small>asked {new Date().toLocaleString()}</small>
              <div className="auth-details">
                <Avatar />
                <p>Shruthi</p>
              </div>
            </div>
            <div className="comments">
              <div className="comment">
                {/* <p>This is comment</p>- <span>Username</span>
                <small>timestamp</small> */}
                {/* <p>{questionData ? questionData.comments[0].comment: ""}</p> */}

                {questionData? questionData.comments && questionData.comments.map((ele) => (
                        <p>
                        {ele.comment}
                        <span style={{ marginLeft: '5px' }}>-{ele.user}</span>
                        <small style={{ marginLeft: '5px' }}> {new Date(ele.created_at).toLocaleString()}</small>
                        </p>

                    )) 
                : ""}
              </div>
              <p onClick={() => setShow(!show)}>Add a comment</p>
              {show && (
                <div className="title">
                  <textarea
                    style={{
                      margin: "5px 0px",
                      padding: "10px",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "3px",
                      outline: "none",
                    }}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Add your comment..."
                    rows={5}
                  />
                  <button
                    onClick={handleComment}
                    style={{
                      maxWidth: "fit-content",
                    }}
                  >
                    Add comment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        {/* there should extra closing dev here */}
        <div
          className="all-questions"
          style={{
            flexDirection: "column",
          }}
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            No.of Answers
          </p>
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>
                <p className="arrow">
                {questionData && questionData.answers ? questionData.answers.length : 0}
                </p>
                <p className="arrow">▲</p>
                <BookmarkBorderIcon />
                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
            {/* Parser */}
                
                  
                {questionData? questionData.answers && questionData.answers.map((ele) => (
                        <p>
                        {parse(ele.answer)}
                        <span style={{ marginLeft: '5px' }}>-{ele.user}</span>
                        <small style={{ marginLeft: '5px' }}> {new Date(ele.created_at).toLocaleString()}</small>
                        </p>

                    )) 
                : ""}
                

                
                <div className="author">
              <small>asked {new Date().toLocaleString()}</small>
              <div className="auth-details">
                <Avatar />
                <p>Shruthi</p>
              </div>
            </div>

          </div>
          </div>

        </div>

      </div>
      <div className="main-answer">
        <h3
        style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >Your answer</h3>
        <ReactQuill
            value={answer}
            onChange={handleQuill}
            modules={{ toolbar: toolbarOptions }}
            className="react-quill"
            theme="snow"
            style={{
            height: "200px",
          }}
        />
      </div>
      <div>
        <button 
        onClick={handleSubmit}
        style={{
          marginTop: "60px",
          maxWidth: "fit-content",
        }}
        >
            Post your answer
        </button>
      </div>
    </div>
  );
}

export default MainQuestion;
