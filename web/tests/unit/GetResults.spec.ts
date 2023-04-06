import AnswerDto from '@/models/AnswerDto'
import {getPercentageResults} from '@/util/GetResults.js'
import {checkAnswer} from "@/util/GetResults.js"
import ActivityDto from '@/models/ActivityDto'
import 'jest'

describe('Get Results functions', () => {


    test('getPercentageResults returns proper % of questions answered correct', () => {
        const results = ["Correct","Incorrect"]
        expect(getPercentageResults(results,2)).toEqual(50)
        const results2 = ["Incorrect", "Incorrect"]
        expect(getPercentageResults(results2,2)).toEqual(0)
        const results3 = ["Correct", "Correct"]
        expect(getPercentageResults(results3,2)).toEqual(100)
    })

    test('checkAnswer returns the correct result to users correct answer', () => {
        const questionObject = new ActivityDto(5, "What was the call ?","multiple-choice", ["Travel", "No Foul Call"], "Travel", "123")
        const rightResultsList = checkAnswer(questionObject, [], "Travel")
        expect(rightResultsList[0]).toEqual("Correct")
    })
    test('checkAnswer returns the correct result to users incorrect answer', () => {
        const questionObject = new ActivityDto(5, "What was the call ?","multiple-choice", ["Travel", "No Foul Call"], "No Foul Call", "123")
        const rightResultsList = checkAnswer(questionObject, [], "Travel")
        expect(rightResultsList[0]).toEqual("Incorrect")
    })
})