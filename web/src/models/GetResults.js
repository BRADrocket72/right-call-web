export function getEachQuestionResults(numberOfQuestions, usersAnswers) {
  let correctOrIncorrectResults = []
  for (let i=0; i<numberOfQuestions; i++) {
    if (usersAnswers[i].isCorrect == true) {
      correctOrIncorrectResults.push("Correct")
    }
    else{
      correctOrIncorrectResults.push("Incorrect")
    }
  } 
  return correctOrIncorrectResults
}


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