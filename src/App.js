import React from 'react';
import Layout from './hoc/Layout/Layout.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz.jsx';
import Auth from './containers/Auth/Auth.jsx';
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx';
import QuizList from './containers/QuizList/QuizList.jsx';
import AuthState from './context/auth/authState.jsx';

function App() {
  return (
    <AuthState>
      <Layout>
        <Switch>
          <Route path='/auth'><Auth /></Route>
          <Route path='/quiz-creator'><QuizCreator /></Route>
          <Route path='/quiz/:poll'><Quiz /></Route>
          <Route path='/' exact><QuizList /></Route>
          <Redirect to='/' />
        </Switch>
      </Layout>
    </AuthState>
  );
}

export default App;
