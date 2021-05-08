import React, {useState, useContext, useEffect} from 'react';
import styles from './QuizCreator.module.scss';
import Button from '../../components/UI/Button/Button.jsx';
import Form from '../../components/Form/Form.jsx';
import {createRandomId} from '../../createRandomId.js';
import SelectAnswer from './SelectAnswer/SelectAnswer.jsx';
import {createControl, isControlValid, isQuestionValid, isQuizValid} from '../../components/Form/FormFramework/FormFramework.jsx';
import {request} from '../../requestDB.js';
import {authContext} from '../../context/auth/authContext.jsx';
import {Redirect} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader';


function QuizCreator() {
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState(createQuestionControl());
  const context = useContext(authContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRestricted, setIsRestricted] = useState(true);

  useEffect(() => {
    if (context.observerBinded) {
      setIsLoading(false);
      setIsRestricted(!context.authenticated);
    }    
  }, [context]);

  function createQuestionControl() {
    return {
      question: createControl(
        {
          label: 'Question',
          id: 0,
          errorMessage: 'Question cannot be empty'
        },
        {
          required: true
        }),
      rightAnswerId: 1,
      option1: createOptionContro(1),
      option2: createOptionContro(2), 
      option3: createOptionContro(3), 
      option4: createOptionContro(4),
    }
  }

  function createOptionContro(id) {
    return createControl(
      {
        label: `Option ${id}`,
        id: id,
        errorMessage: 'Option cannot be empty'

      },
      {
        required: true
      }
    )
  }

  function handleInputChange(event) {
    const questionClone = {...question};

    for (const [key, value] of Object.entries(questionClone)) {
      if (value.id === +event.target.id) {
        questionClone[key].value = event.target.value;
        questionClone[key].touched = true
        questionClone[key].valid = isControlValid(value);

        setQuestion(questionClone);
      }
    }
  }

  function addQuestion(event) {
    event.preventDefault();
    setQuiz([...quiz, question]);
    setQuestion(createQuestionControl());
  }

  async function addQuiz(event) {
    event.preventDefault();

    await request('quizzes', 'POST', quiz);
    setQuiz([]);
  }

  const formButtons = [
    <Button key={createRandomId()} disabled={!isQuestionValid(question)} name='Add question' clickHandler={addQuestion} />,
    <Button key={createRandomId()} disabled={!isQuizValid(quiz)} name='Add quiz' clickHandler={addQuiz} />
  ]

  function handleRightAnswer(event) {
    setQuestion({...question, rightAnswerId: +event.target.value});
  }

  return (
    <>
      {
        isLoading
        ? <div className={styles.QuizCreator}>
            <Loader />
          </div>
        : isRestricted
          ? <Redirect to='/auth' />
          : <div className={styles.QuizCreator}>
              <Form
                title="QuizCreator"
                formControl={question}
                handleInputChange={handleInputChange}
                buttons={formButtons}
                selectRightAnswer={<SelectAnswer question={question} handleRightAnswer={handleRightAnswer}/>}
              />
          </div>
      }
    </>
  );
}

export default QuizCreator;
