const basicURL = 'https://react-quiz-819fd-default-rtdb.europe-west1.firebasedatabase.app/';

export async function request(subUrl, method='GET', rawData=null) {
  let options;

  if (rawData) {
    options = {
      method: method,
      body: JSON.stringify(rawData)
    }
  } else {
    options = {method: method}
  }
  
  const response = await fetch(basicURL+subUrl+'.json', options);
  const result = await response.json()

  return result;
}