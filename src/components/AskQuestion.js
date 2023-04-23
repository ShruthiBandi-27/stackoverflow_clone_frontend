import React, {useState} from 'react'
import './AskQuestion.css';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
import {API} from  './global.js';
import { useNavigate } from "react-router-dom";

function AskQuestion() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTag] = useState([]);
    const nav = useNavigate();

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

      const handleQuill = (value) => {
        setBody(value);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (title !== "" && body !== "") {
          const bodyJSON = {
            title: title,
            body: body,
            tags: tags,
            //tags: JSON.stringify(tags),
            //user: user,
          };
          //alert("Question added successfully");
      
      await axios
      .post(`${API}/ask-question`, bodyJSON)
      .then((res) => {
        // console.log(res.data);
        //alert("Question added successfully");
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  

    }
    

  return (
    <div className="add-question">
        <div className="add-question-container">
            <div className="head-title">
                <h1>Ask a public question</h1>
            </div>
            <div className="question-container">
                <div className="question-options">
                    <div className="quesiton-option">
                        <div className="title">
                            <h3>Title</h3>
                            <small>Be specific and imagine you’re asking a question to another person.</small>
                            <input 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                            />
                        </div>
                    </div>
                    <div className="question-option">
                        <div className="title">
                            <h3>What are the details of your problem?</h3>
                            <small>
                            Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                            </small>
                            <ReactQuill 
                                value={body}
                                onChange={handleQuill}
                                modules={{ toolbar: toolbarOptions }}
                                 className="react-quill"
                                theme="snow"
                            />
                        </div>
                    </div>
                    <div className="question-option">
                        <div className="title">
                            <h3>Tags</h3>
                            <small>Add up to 5 tags to describe what your question is about</small>
                            <TagsInput
                                value={tags}
                                onChange={setTag}
                                name="tags"
                                placeholder="press enter to add new tag"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className="button">
                Post your question
            </button>
        </div>
    </div>
  );
}

export default AskQuestion;