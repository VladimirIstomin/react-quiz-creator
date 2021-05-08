import React from 'react';
import styles from './Input.module.scss';

function Input(props) {  
  let errorMessage;
  const state = props.state;

  if (!state.valid && state.touched) {
    errorMessage = state.errorMessage;
  }

  return (
    <div className={styles.Input + ' ' + styles.inputComponent}>
      <label htmlFor={state.id}>{state.label}</label>
      <input
        type={state.type}
        name={state.label}
        id={state.id}
        value={state.value}
        onChange={props.handleInputChange}
      />
      { errorMessage ? <p>{errorMessage}</p> : null }
    </div>
  );
}

export default Input;
