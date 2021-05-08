import React, { useState, useContext, useEffect } from 'react';
import Button from '../../components/UI/Button/Button.jsx';
import styles from './Auth.module.scss';
import Form from '../../components/Form/Form.jsx';
import is from 'is_js';
import { createRandomId } from '../../createRandomId.js';
import firebase from "firebase/app";
import 'firebase/auth';
import {authContext} from '../../context/auth/authContext.jsx';
import Loader from '../../components/UI/Loader/Loader.jsx';


function Auth() {
  const [authControls, setAuthControls] = useState(createAuthControl);
  const context = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  function createAuthControl() {
    return (
      {
        email: {
          label: 'Email',
          id: createRandomId(),
          value: '',
          touched: false,
          type: 'email',
          errorMessage: 'Type correct email',
          valid: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          label: 'Password',
          id: createRandomId(),
          value: '',
          touched: false,
          type: 'password',
          errorMessage: 'Password should be at least 6 characters long',
          valid: false,
          validation: {
            required: true,
            length: 6
          }
        }
      }
    )
  }

  useEffect(() => setLoading(!context.observerBinded), [context]);

  function handleInputChange(event) {
    if (event.target.name === 'Email') {
      const emailState = {...authControls.email};

      emailState.value = event.target.value.trim();
      emailState.touched = true;

      if (emailState.validation.required) {
        emailState.valid = is.email(emailState.value);
      } 

      setAuthControls({...authControls, email: emailState});
    } else {
      const passwordState = {...authControls.password};

      passwordState.value = event.target.value.trim();
      passwordState.touched = true;

      if (passwordState.validation.length) {
        passwordState.valid = passwordState.value.length >= passwordState.validation.length;
      }

      setAuthControls({...authControls, password: passwordState});
    }
  }

  function isFormValid() {
    const isEmailValid = (!authControls.email.validation.required && !authControls.email.touched) || authControls.email.valid;
    const isPasswordValid = (!authControls.password.validation.required && !authControls.password.touched) || authControls.password.valid;

    return isEmailValid && isPasswordValid;
  }

  async function signUserUp() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(authControls.email.value, authControls.password.value);
      console.log('Successfully signed up!');
      context.login();
    } catch (e) {
      console.log(e);
      handleErrorMessage(e.message);
    }  
    
    setAuthControls(createAuthControl());
  }

  async function signUserIn() {
    try {
      await firebase.auth().signInWithEmailAndPassword(authControls.email.value, authControls.password.value);
      context.login();
      console.log('Successully logged in!');
    } catch (e) {
      console.log(e);
      handleErrorMessage(e.message);
    }

    setAuthControls(createAuthControl());
  }

  function logUserOut() {
    firebase.auth().signOut();
    context.logout();
  }

  function handleErrorMessage(errorMessage) {
    setErrorMessage(errorMessage)
    setTimeout(() => setErrorMessage(null), 10000);
  }

  const buttons = [
    <Button key={createRandomId()} disabled={!isFormValid()} clickHandler={signUserUp} name='Register'/>,
    <Button key={createRandomId()} disabled={!isFormValid()} clickHandler={signUserIn} name='Log in'/>
  ]

  const loggedInScreen = <div className={styles.LoggedInScreen}>
    <h1 >You already logged in</h1>
    <Button clickHandler={logUserOut} name="Log me out!" />
  </div>

  return (
    <div className={styles.Auth}>
    {
      loading
        ? <Loader />
        : context.authenticated
          ? loggedInScreen
          : <Form
              title='Authentication'
              handleInputChange={handleInputChange}
              formControl={authControls} 
              buttons={buttons}
            />
      }
      {
        errorMessage
        ? <p className={styles.Error}>{errorMessage}</p>
        : null
      }
    </div>
  );
}

export default Auth;
