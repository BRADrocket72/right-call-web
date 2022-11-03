export function getResults(numberOfQuestions, usersAnswers) {
    let percentageResults = []
    for (let i=0; i<numberOfQuestions; i++) {
      if (usersAnswers[i].isCorrect == true) {
        percentageResults.push("Correct")
      }
      else{
        percentageResults.push("Incorrect")
      }
    } 
    return percentageResults
  }