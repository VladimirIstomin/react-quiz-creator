import React from 'react';
import styles from './ActiveQuiz.module.scss';
import AnswerList from './Answers/AnswersList.jsx';


function ActiveQuiz(props) {
    return (
        <div className={styles.ActiveQuiz}>
            <p className={styles.Question}>   
                <span>
                    <strong>{props.question.id}. </strong>
                    {props.question.question}
                </span>
                <small>{props.answerNumber} of {props.quizLength}</small>
            </p>
        <AnswerList
            onAnswerClick={props.onAnswerClick}
            answers={props.question.answers}
            answersState={props.answersState.hasOwnProperty(String(props.question.id - 1)) ? props.answersState[String(props.question.id - 1)] : {}} />   
        </div>
    );
}

export default ActiveQuiz;