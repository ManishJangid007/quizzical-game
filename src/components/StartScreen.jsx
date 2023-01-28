import React from "react";
import './StartScreen.css';

export default function StartScreen(props) {
    return (
        <div className="start_screen">
            <h1>Quizzical</h1>
            <p>Let's Test Your Knowledge</p>
            <button onClick={props.start} >Start quiz</button>
        </div>
    )
}