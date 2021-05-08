import React from 'react';
import styles from './Button.module.scss';


function Button(props) {
  const clickHandler = props.clickHandler ?? null;

  return (
    <button disabled={!!props.disabled} className={styles.Button} onClick={clickHandler}>{props.name}</button>
  )
}

export default Button;