export function createControl(config, validation) {
  return (
    {
      ...config,
      value: '',
      type: 'text',
      touched: false,
      valid: false,
      validation: validation
    }
  );
}


export function isControlValid(optionValues, isValid=true) {
  if (optionValues.validation && optionValues.validation.required) {
    return optionValues.value.trim() && isValid;
  }
}


export function isQuestionValid(question) {
  let isValid = true;

    for (const entry of Object.entries(question)) {
      isValid = isControlValid(entry[1], isValid);
    };

    return isValid;
}


export function isQuizValid(quiz) {
  return quiz.length > 0;
}