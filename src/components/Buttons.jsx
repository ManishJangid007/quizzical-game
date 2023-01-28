import React from "react";
import "./Buttons.css";

export default function Buttons(props) {
    return (
        <div className="btn--div">
            <button className="quit--btn" onClick={props.quit} >Quit</button>
            {props.gameOver ? 
                <>
                    <p>Score : {props.score}/5 correct answers</p>
                    <button className="default--btn" onClick={props.playAgain}>Play again</button> 
                </> : 
                <button className="default--btn" onClick={props.showAnswer}>Show answers</button>
            }
        </div>
    )
}