import Activity from "@/models/Activity.js"
import Answer from "@/models/Answer.js"
import VideoClip from "@/models/VideoClip.js"

export function retrieveAndCreateAllVideos() {
  var videoOne = new VideoClip("Basketball Lesson One", "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", [5.7, 14.4])
  var videoTwo = new VideoClip("Basketball Lesson Two", "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul_2.m4v", [8.2, 14])
  var videoThree = new VideoClip("Basketball Lesson Three", "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P3_Traveling.m4v", [10.3, 13])
  var videoFour = new VideoClip("Basketball Lesson Four", "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P17_Offensive_Foul.m4v", [6.9, 12])
  return[videoOne , videoTwo , videoThree, videoFour]
}

export function retrieveAndCreateAllQuestions() {
  var firstQuestion = new Activity("question_one", "What was the call ?", "637a61d49db11c5b4dd1b3b8", ["Personal Foul", "No Foul Call"])
  var secondQuestion = new Activity("question_two", "What was the call ?", "637a61d49db11c5b4dd1b3b8", ["Shooting Foul", "Flagrant Foul"])
  var thirdQuestion = new Activity("question_three", "What was the call ?", "637a629a9db11c5b4dd1b3c2", ["No Foul Call", "Double Dribble"])
  var fourthQuestion = new Activity("question_four", "What was the call ?", "637a629a9db11c5b4dd1b3c2", ["Blocking Foul", "Shooting Foul"])
  var fifthQuestion = new Activity("question_five", "What was the call ?", "Basketball Lesson Three", ["No Foul Call", "Shooting Foul"])
  var sixthQuestion = new Activity("question_six", "What was the call ?", "Basketball Lesson Three", ["Traveling", "Double Dribble"])
  var seventhQuestion = new Activity("question_seven", "What was the call ?", "Basketball Lesson Four", ["Personal Foul", "No Foul Call"])
  var eighthQuestion = new Activity("question_eight", "What was the call ?", "Basketball Lesson Four", ["Offensive Foul", "Blocking Foul"])

  return [firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion, sixthQuestion, seventhQuestion, eighthQuestion]
}

export function retrieveAndCreateAllAnswers() {

  var firstQuestionAnswer = new Answer("question_one", null, "No Foul Call")
  var secondQuestionAnswer = new Answer("question_two", null, "Shooting Foul")
  var thirdQuestionAnswer = new Answer("question_three", null, "No Foul Call")
  var fourthQuestionAnswer = new Answer("question_four", null, "Shooting Foul")
  var fifthQuestionAnswer = new Answer("question_five", null, "No Foul Call")
  var sixthQuestionAnswer = new Answer("question_six", null, "Traveling")
  var seventhQuestionAnswer = new Answer("question_seven", null, "No Foul Call")
  var eighthQuestionAnswer = new Answer("question_eight", null, "Offensive Foul")

  return [firstQuestionAnswer, secondQuestionAnswer, thirdQuestionAnswer, fourthQuestionAnswer, fifthQuestionAnswer, sixthQuestionAnswer, seventhQuestionAnswer, eighthQuestionAnswer]
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

