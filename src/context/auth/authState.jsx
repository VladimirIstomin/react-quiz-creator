import React, {useReducer, useEffect, useState} from 'react';
import {authContext} from './authContext.jsx';
import authReducer from './authReducer.jsx';
import {LOGIN, LOGOUT} from './authActionTypes.jsx';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function AuthState(props) {
  const [state, dispatch] = useReducer(authReducer, false);
  const [observerBinded, setObserverBinded] = useState(false);

  function login() {
    dispatch({type: LOGIN})
  }

  function logout() {
    dispatch({type: LOGOUT})
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('Observer triggered');
      if (user) {
        login();
      } else {
        logout();
      }

      setObserverBinded(true);
    })}, []);
  
  return (
    <authContext.Provider value={{login, logout, observerBinded, authenticated: state}}>
      {props.children}
    </authContext.Provider>
  )
}