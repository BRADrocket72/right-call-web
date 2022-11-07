import Activity from "@/models/Activity.js"
import Answer from "@/models/Answer.js"
import VideoClip from "@/models/VideoClip.js"

export function retrieveAndCreateAllVideos() {
  var videoOne = new VideoClip("Basketball Lesson One", 14, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", [2.8, 7.9])
  var videoTwo = new VideoClip("Basketball Lesson Two", 14, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul_2.m4v", [3.2, 6.8])
  var videoThree = new VideoClip("Basketball Lesson Three", 13, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P3_Traveling.m4v", [4.2, 6.8])
  return[videoOne , videoTwo , videoThree]
}

export function retrieveAndCreateAllQuestions() {
  var firstQuestion = new Activity("question_one", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Traveling"])
  var secondQuestion = new Activity("question_two", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Flagrant Foul"])
  var thirdQuestion = new Activity("question_three", "What was the call ?", "Basketball Lesson Two", ["Shooting Foul", "Offensive Foul"])
  var fourthQuestion = new Activity("question_four", "What was the call ?", "Basketball Lesson Two", ["Blocking Foul", "Offensive Foul"])
  var fifthQuestion = new Activity("question_five", "What was the call ?", "Basketball Lesson Three", ["Personal Foul", "Offensive Foul"])
  var sixthQuestion = new Activity("question_six", "What was the call ?", "Basketball Lesson Three", ["Traveling", "Double Dribble"])

  return [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion]
}

export function retrieveAndCreateAllAnswers() {

  var firstQuestionAnswer = new Answer("question_one", null, "Traveling")
  var secondQuestionAnswer = new Answer("question_two", null, "Shooting Foul")
  var thirdQuestionAnswer = new Answer("question_three", null, "Shooting Foul")
  var fourthQuestionAnswer = new Answer("question_four", null, "Offensive Foul")
  var fifthQuestionAnswer = new Answer("question_five", null, "Personal Foul")
  var sixthQuestionAnswer = new Answer("question_six", null, "Traveling")
  return [firstQuestionAnswer, secondQuestionAnswer, thirdQuestionAnswer, fourthQuestionAnswer, fifthQuestionAnswer, sixthQuestionAnswer]
}

export function retrieveVideosQuestionsById(videoId, questionsArray) {
  let newArray = []
  for (const question of questionsArray) {
    if (question.videoId == videoId) {
      newArray.push(question)
    }
  }
  return newArray
}

