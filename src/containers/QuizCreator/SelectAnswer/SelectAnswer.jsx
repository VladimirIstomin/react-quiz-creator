import React from 'react';
import styles from './SelectAnswer.module.scss';
import {createRandomId} from '../../../createRandomId.js';


export default function SelectAnswer(props) {
  const id = createRandomId();
  return (
    <React.Fragment>
      <label className={styles.label} htmlFor={id}>Choose the right answer</label>
      <select id={id} className={styles.Select} onChange={props.handleRightAnswer} value={props.question.rightAnswerId}>
        {
          Object.keys(props.question).map((option, index) => {
              if (option.includes('option')) {
                return <option key={createRandomId()} value={props.question[option].id}>{option.split('option')[1]}</option>
              }
              
              return null
          })
        }
      </select>
    </React.Fragment>
  )
}
