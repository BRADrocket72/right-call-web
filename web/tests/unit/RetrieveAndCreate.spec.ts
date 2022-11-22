import 'jest'
import {retrieveAndCreateAllVideos} from "@/models/RetrieveAndCreate.js"
import {retrieveAndCreateAllQuestions} from "@/models/RetrieveAndCreate.js"
import {retrieveAndCreateAllAnswers} from "@/models/RetrieveAndCreate.js"
import {retrieveVideosQuestionsById} from "@/models/RetrieveAndCreate.js"
import Activity from '@/models/Activity.js'
import Answer from '@/models/Answer.js'

describe('Retrieve and Create functions', () => {
    const activityArr = retrieveAndCreateAllQuestions()
    const questionObject = new Activity("question_one", "What was the call ?", "637a61d49db11c5b4dd1b3b8", ["Personal Foul", "No Foul Call"])
    const videosQuestionsList = retrieveVideosQuestionsById(questionObject.videoId,activityArr)
    const answersList = retrieveAndCreateAllAnswers()

    test('retrieveAndCreateAllVideos returns a list of the available video lessons', () => {
        const retrievedVideos = retrieveAndCreateAllVideos()
        expect(retrievedVideos.length).toBe(4)
    })
    
    test('retrieveAndCreateAllQuestions returns a list of question Activity objects', () => {
        expect(activityArr.length).toBe(8)
        expect(activityArr[0]).toMatchObject(questionObject)
    })

    test('retrieveAndCreateAllAnswers returns a list of answer objects', () => {
        const answerObject = new Answer ("question_one",null,"No Foul Call")
        expect(answersList.length).toBe(8)
        expect(answersList[0]).toMatchObject(answerObject)
    })

    test('retrieveVideosQuestions returns a list of Activity object for the proper video id', () => {
        expect(videosQuestionsList.length).toBe(2)
        expect(videosQuestionsList[0]).toMatchObject(questionObject)
    })
})