import React, { useState, useEffect } from "react";
import "./Question.css"

export default function Question(props) {
    const options = [
        props.ques.correct_answer,
        ...props.ques.incorrect_answers
    ]

    const [randomArr, setRandomArr] = useState(() => randArr());

    useEffect(() => {
        setRandomArr(randArr());
    }, [props.ques.question])

    let decodedQuestion = props.ques.question.replace(/&quot;/g, '"');
    decodedQuestion = decodedQuestion.replace(/&#039;/, "'");

    return (
        <div className="question">
            <h3>{cleanText(props.ques.question)}</h3>
            <div className="options">
                {props.gameOver ?
                    props.ques.correct_answer === props.ques.selected ?
                        randomArr.map(
                            i => <button
                                key={i}
                                className={`option ${options[i] === props.ques.correct_answer ? 'correct' : 'unselected'}`}
                            >
                                {cleanText(options[i])}
                            </button>) :
                        randomArr.map(
                            i => <button
                                key={i}
                                className={`option ${options[i] === props.ques.correct_answer ?
                                        'correct' : options[i] === props.ques.selected ?
                                            'wrong' : 'unselected'
                                    }`}
                            >
                                {cleanText(options[i])}
                            </button>)
                    :
                    randomArr.map(
                        i => <button
                            key={i}
                            className={`option ${options[i] === props.ques.selected ? "selected" : "unselected"}`}
                            onClick={() => props.select(props.ques.question, options[i])}>
                            {cleanText(options[i])}
                        </button>
                    )
                }
            </div>
            <hr />
        </div>
    )
}

function cleanText(text) {
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#039;/g, "'");
    return text;
}

function randArr() {
    const arr = [];
    let num = 0;
    while (arr.length <= 3) {
        num = Math.floor(Math.random() * 4) + 0
        if (!arr.includes(num)) arr.push(num)
    }
    return arr;
}