import React from 'react';
import styles from './FinishedQuiz.module.scss';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button.jsx';
import {createRandomId} from '../../createRandomId.js';

function FinishedQuiz(props) {
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {
          props.quiz.map(question => {
            return (
              <li key={createRandomId()}>
              <strong>{question.id}. </strong>
              {question.question}

              {
                Object.keys(props.answersState[String(question.id - 1)]).length === 1
                ? <i className={"fas fa-check " + styles.Right}></i>
                : <i className={"fas fa-times " + styles.Wrong}></i>
              }
            </li>
            );
          })
        }
      </ul>

      <p>Number of attempts: {props.numAttempts}</p>

      <Button name='Try again!' clickHandler={props.restartQuiz}/>
      <Link to='/'><Button name='Go back to the list of quizzes!' /></Link>
    </div>
  )
}

export default FinishedQuiz;