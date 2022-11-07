import Answer from '@/models/Answer'
import {getEachQuestionResults} from '@/models/GetResults.js'
import {getPercentageResults} from '@/models/GetResults.js'
import {retrieveAndCreateAllAnswers} from "@/models/RetrieveAndCreate.js"
import {checkAnswer} from "@/models/GetResults"
import Activity from '@/models/Activity'
import 'jest'

describe('Get Results functions', () => {

    test('getEachQuestionResults returns list of results, whether each quesition was correct or not', () => {
        const rightAnswer = new Answer ("question_one",true,"Traveling")
        const wrongAnswer = new Answer ("question_two",false,"Traveling")
        const answersList = [rightAnswer,wrongAnswer] 
        const expected = getEachQuestionResults(2,answersList)
        expect(expected.length).toBe(2)
        expect(expected).toEqual(["Correct", "Incorrect"])
    })

    test('getPercentageResults returns proper % of questions answered correct', () => {
        const results = ["Correct","Incorrect"]
        expect(getPercentageResults(results,2)).toEqual("50.00%")
    })

    test('checkAnswer returns a list of Answers with the correct .isCorrect value', () => {
        const questionObject = new Activity("question_one", "What was the call ?", "Basketball Lesson One", ["Shooting Foul", "Traveling"])
        const rightAnswer = retrieveAndCreateAllAnswers()
        const wrongAnswer = retrieveAndCreateAllAnswers()
        const rightResultsList = checkAnswer(questionObject,rightAnswer,questionObject.answerOptions[1])
        const wrongResultsList = checkAnswer(questionObject,wrongAnswer,questionObject.answerOptions[0])
        expect(rightResultsList[0].isCorrect).toBe(true)
        expect(wrongResultsList[0].isCorrect).toBe(false)
    })
})