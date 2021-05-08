import React from 'react';
import styles from './AnswerItem.module.scss';


function AnswerItem(props) {
  const classes = [
    styles.AnswerItem
  ]

  if (props.answersState) {
    classes.push(styles.Right);
  } else if (props.answersState === false) {
    classes.push(styles.Wrong);
  }

  return (
    <li
      className={classes.join(' ')}
      onClick={() => props.onAnswerClick(props.id)}
    >
      {props.text}
    </li>
  );
}

export default AnswerItem;