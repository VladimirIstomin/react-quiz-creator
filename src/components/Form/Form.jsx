import React from 'react'
import styles from './Form.module.scss';
import Input from '../UI/Input/Input.jsx';

export default function Form(props) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.formTitle}>{props.title}</h1>
      <form onSubmit={event => event.preventDefault()}>
        {
          Object.keys(props.formControl).map((item, index) => {
            if (item === 'rightAnswerId') return null;
            return (
              <Input
                key={index}
                state={props.formControl[item]}
                handleInputChange={props.handleInputChange}
              />
            );
          })  
        }
        {props.selectRightAnswer}

        <div>
          {props.buttons}
        </div>
        
      </form>
    </div>
  )
}
