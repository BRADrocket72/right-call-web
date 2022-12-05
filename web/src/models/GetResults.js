export function getPercentageResults(resultsArray, numberOfQuestions) {
  let correctCounter = 0;
  for (const result of resultsArray) {
    if (result == "Correct") {
      correctCounter++
    }
  }
  let percentage = ((correctCounter/numberOfQuestions)*100).toFixed(2) + "%"
  return percentage
}


export function checkAnswer(question, answersArray, answerChoice) {
  if (question.correctAnswer == answerChoice) {
    answersArray.push("Correct")
  }
  else{
    answersArray.push("Incorrect")
  }
  return answersArray
}