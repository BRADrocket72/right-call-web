import Activity from "@/models/Activity.js"
import Answer from "@/models/Answer.js"

export function createQuestions() {
    var firstQuestion = new Activity("question_one", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Traveling"])
    var secondQuestion = new Activity("question_two", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Flagrant Foul"])
    var thirdQuestion = new Activity("question_three", "What was the call ?", "Basketball Lesson Two", ["Shooting Foul", "Offensive Foul"])
    var fourthQuestion = new Activity("question_four", "What was the call ?", "Basketball Lesson Two", ["Blocking Foul", "Offensive Foul"])
    var fifthQuestion = new Activity("question_five", "What was the call ?", "Basketball Lesson Three", ["Personal Foul", "Offensive Foul"])
    var sixthQuestion = new Activity("question_six", "What was the call ?", "Basketball Lesson Three", ["Traveling", "Double Dribble"])

    return [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion]
  }

  export function retrieveAnswers(){

    //THIS FUNCTION IS NOT IMPLEMENTED YET
    var firstQuestionAnswer = new Answer("question_one", null, "Traveling")
    var secondQuestionAnswer = new Answer("question_two", null, "Shooting Foul")
    var thirdQuestionAnswer = new Answer("question_three", null, "Shooting Foul")
    var fourthQuestionAnswer = new Answer("question_four", null, "Offensive Foul")
    var fifthQuestionAnswer = new Answer("question_five", null, "Personal Foul")
    var sixthQuestionAnswer = new Answer("question_six", null, "Traveling")
    return [firstQuestionAnswer, secondQuestionAnswer, thirdQuestionAnswer, fourthQuestionAnswer, fifthQuestionAnswer, sixthQuestionAnswer]
  }

  //Retrieves the questions for the video by each question's videoId
  export function retrieveVideosQuestions(videoId, questionsArray) {
    let newArray = []
    for (const question of questionsArray) {
      if (question.videoId == videoId) {
        newArray.push(question)
      }
    }
    return newArray
  }


