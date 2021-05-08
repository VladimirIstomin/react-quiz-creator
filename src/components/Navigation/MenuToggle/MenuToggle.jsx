import React from 'react';
import styles from './MenuToggle.module.scss';


function MenuToggle(props) {
  const cls = [
    styles.MenuToggle,
    'fa',
  ]

  if (props.isOpen) {
    cls.push('fa-times');
    cls.push(styles.Open);
  } else {
    cls.push('fa-bars');
  }

  return (
    <i
      className={cls.join(' ')}
      onClick={props.onToggle}
    >
    </i>
  )
}

export default MenuToggle;
