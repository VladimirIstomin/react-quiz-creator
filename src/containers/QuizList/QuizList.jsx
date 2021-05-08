import React, {Component} from 'react';
import styles from './QuizList.module.scss';
import {NavLink} from 'react-router-dom';
import {request} from '../../requestDB.js';
import Loader from '../../components/UI/Loader/Loader.jsx';

class QuizList extends Component {
  state = {
    quizzes: [],
    loading: true
  }
  
  async componentDidMount() {
    try {
      const response = await request('quizzes');
      const quizzes = []
      Object.keys(response).forEach((key, index) => {
        quizzes.push({id: key, name: `Quiz №${index + 1}`});
      });
      this.setState({quizzes: quizzes, loading: false});

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={styles.QuizList}>
        <h1>List of quizzes</h1>
        {
          this.state.loading
            ? <Loader />
            : <ul>
                {
                  this.state.quizzes.map((quiz, index) => {
                    return (
                      <li key={index}>
                        <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
                      </li>
                    );
                  })
                }
              </ul>
        }
      </div>
    )
  }
}

export default QuizList;
