import React from 'react';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.Loader}></div>
    </div>
  )
}
