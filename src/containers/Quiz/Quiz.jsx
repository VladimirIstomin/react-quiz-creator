import React, {useState, useEffect} from 'react';
import styles from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.jsx';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz.jsx';
import {withRouter} from 'react-router-dom';
import {request} from '../../requestDB.js';
import Loader from '../../components/UI/Loader/Loader.jsx';

function Quiz(props) {
    const [quiz, setQuiz] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answersState, setAnswersState] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [numAttempts, setNumAttempts] = useState(0);

    useEffect(() => {
        try {
            request('quizzes').then(response => {
                const quiz = response[props.match.params.poll];
                quiz.forEach(async (item, index) => {                  
                    const question = {
                        question: item.question.value,
                        rightAnswerId: item.rightAnswerId,
                        id: index + 1,
                        answers: [
                            {text: item.option1.value, id: item.option1.id},
                            {text: item.option2.value, id: item.option2.id},
                            {text: item.option3.value, id: item.option3.id},
                            {text: item.option4.value, id: item.option4.id}
                        ]
                    }

                    setQuiz(prev => [...prev, question])
                    setLoading(false);
                });
            })
        } catch(e) {
            console.log(e);
        }
    }, [])


    function onAnswerClickHandler(answerId) {
        const rightAnswerId = quiz[activeQuestion].rightAnswerId;

        const isRightAnswer = rightAnswerId === answerId;

        if (isRightAnswer) {
            if (isQuizFinished()) {
                setTimeout(() => setIsFinished(true), 1000);
            } else {
                setTimeout(showNextQuestion, 1000);
            }
        }

        setNumAttempts(numAttempts + 1);
        updateAnswerState(answerId, isRightAnswer); 
    }


    function isQuizFinished() {
        return quiz.length === activeQuestion + 1;
    }


    function showNextQuestion() {
        setActiveQuestion(activeQuestion + 1);
    }


    function updateAnswerState(answerId, isRightAnswer) {
        setAnswersState((previous) => {
            return (
                {
                    ...previous,
                    [activeQuestion]: {
                        ...previous[String(activeQuestion)],
                        [answerId]: isRightAnswer
                    }
                }
            ) 
        });
    }

    
    function restartQuiz() {
        setActiveQuestion(0);
        setAnswersState({});
        setIsFinished(false);
        setNumAttempts(0);
    }

    return (
        <div className={styles.Quiz}>
            <div className={styles.QuizWrapper}>
                <h1>Answer all the questions</h1>
                {
                    loading
                        ? <Loader />
                        : isFinished
                            ? <FinishedQuiz 
                                quiz={quiz}
                                answersState={answersState}
                                numAttempts={numAttempts}
                                restartQuiz={restartQuiz}
                            />
                            : <ActiveQuiz 
                                onAnswerClick={onAnswerClickHandler} 
                                question={quiz[activeQuestion]}
                                quizLength={quiz.length}
                                answerNumber={activeQuestion + 1}
                                answersState={answersState}
                            />
                }
            </div>
        </div>
    );
}

export default withRouter(Quiz);