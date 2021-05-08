import React, { useState, useEffect, useContext } from 'react';
import styles from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop.jsx'
import {NavLink, withRouter} from 'react-router-dom';
import {authContext} from '../../../context/auth/authContext.jsx'


function Drawer(props) {
  const context = useContext(authContext);
  const [links, setLinks] = useState([
    {to: '/', label: 'Main Page', exact: true},
    {to: '/auth', label: 'Log In', exact: false},
  ]);

  const cls = [
    styles.Drawer
  ];

  useEffect(() => {
    if (!context.observerBinded) return

    if (context.authenticated && links.filter(link => link.to === '/quiz-creator').length === 0) {
      setLinks([...links, {to: '/quiz-creator', label: 'Create quiz', exact: false}])
    } else if (!context.authenticated) {
      const newlinks = [...links];
      setLinks(newlinks.filter(link => link.to !== '/quiz-creator'));
    }
  }, [context]);
  

  if (props.isOpen) {
    cls.push(styles.Open);
  }

  return (
    <>
      <nav
        className={cls.join(' ')}
      >
        <ul>
        {
          links.map((link, index) => <li key={index}>
          <NavLink
            className={styles.link}
            to={link.to}
            exact={link.exact}
            onClick={props.onToggle}
            activeClassName={styles.active}
          >
            {link.label}
          </NavLink></li>)
        }
        </ul>
      </nav>

      {
        props.isOpen ? <Backdrop onToggle={props.onToggle} /> : null
      }
    </>
  )
}

export default withRouter(Drawer);
