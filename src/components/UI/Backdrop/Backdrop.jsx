import React from 'react';
import styles from './Backdrop.module.scss';


function Backdrop(props) {
  return <div
    className={styles.Backdrop}
    onClick={props.onToggle}
  >
  </div>
}

export default Backdrop;
