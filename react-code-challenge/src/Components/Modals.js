import React, { useState } from "react";
import { createPosts } from "./ActionHandler";
import './Modals.css';
import { store } from "./Pages/Home";

let lastId = 20;
export default function Modal({isOpen}) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    function clear()
    {
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
    }

    function Submit(e) {
        lastId += 1; 
        store.dispatch(createPosts(lastId, title, body));
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
        alert("Post Successful!");
    }
    return(
        <div className="modal">
            <center>
            <strong>Add Posts</strong>
            </center>
            <center>
            <input onChange={(e)=>{setTitle(e.target.value)}} className = "modal-input" id="title" placeholder="Enter the new title....."></input>
            <textarea onChange={(e)=>{setBody(e.target.value)}} className= "modal-input" id="body"  placeholder="Enter in the Body Section...."></textarea>
            </center>

            <button onClick={Submit} className="modal-add-button">Submit</button>
            <button onClick={clear} className="modal-add-button">Clear All</button>
           
        </div>
    )
}