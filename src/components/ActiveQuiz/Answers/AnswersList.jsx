import React from 'react';
import styles from './AnswersList.module.scss';
import AnswerItem from './AnswerItem.jsx';


function AnswersList(props) {
  return (
    <ul className={styles.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            key={answer.id}
            text={answer.text}
            id={answer.id}
            onAnswerClick={props.onAnswerClick}
            answersState={props.answersState.hasOwnProperty(answer.id) ? props.answersState[String(answer.id)] : null}
          />
        )
      })} 
    </ul>
  );
}

export default AnswersList;
