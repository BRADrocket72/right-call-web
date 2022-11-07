import 'jest'
import {retrieveAndCreateAllVideos} from "@/models/RetrieveAndCreate.js"
import {retrieveAndCreateAllQuestions} from "@/models/RetrieveAndCreate.js"
import {retrieveAndCreateAllAnswers} from "@/models/RetrieveAndCreate.js"
import {retrieveVideosQuestionsById} from "@/models/RetrieveAndCreate.js"
// import {checkAnswer} from "@/models/RetrieveAndCreate.js"
import Activity from '@/models/Activity.js'
import Answer from '@/models/Answer.js'

describe('Retrieve and Create functions', () => {
    const activityArr = retrieveAndCreateAllQuestions()
    const questionObject = new Activity("question_one", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Traveling"])
    const videosQuestionsList = retrieveVideosQuestionsById(questionObject.videoId,activityArr)
    const answersList = retrieveAndCreateAllAnswers()

    test('retrieveAndCreateAllVideos returns a list of the available video lessons', () => {
        const retrievedVideos = retrieveAndCreateAllVideos()
        expect(retrievedVideos.length).toBe(3)
    })
    
    test('retrieveAndCreateAllQuestions returns a list of question Activity objects', () => {
        expect(activityArr.length).toBe(6)
        expect(activityArr[0]).toMatchObject(questionObject)
    })

    test('retrieveAndCreateAllAnswers returns a list of answer objects', () => {
        const answerObject = new Answer ("question_one",null,"Traveling")
        expect(answersList.length).toBe(6)
        expect(answersList[0]).toMatchObject(answerObject)
    })

    test('retrieveVideosQuestions returns a list of Activity object for the proper video id', () => {
        const vid = 'Basketball Lesson One'
        expect(videosQuestionsList.length).toBe(2)
        expect(videosQuestionsList[0]).toMatchObject(questionObject)
    })

    // test('checkAnswer returns a list of Answers with the correct .isCorrect value', () => {
    //     const rightAnswer = retrieveAndCreateAllAnswers()
    //     const wrongAnswer = retrieveAndCreateAllAnswers()
    //     const rightResultsList = checkAnswer(questionObject,rightAnswer,questionObject.answerOptions[1])
    //     const wrongResultsList = checkAnswer(questionObject,wrongAnswer,questionObject.answerOptions[0])
    //     expect(rightResultsList[0].isCorrect).toBe(true)
    //     expect(wrongResultsList[0].isCorrect).toBe(false)
    // })
})