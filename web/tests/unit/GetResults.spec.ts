import Answer from '@/models/Answer'
import {getPercentageResults} from '@/models/GetResults.js'
import {checkAnswer} from "@/models/GetResults"
import Activity from '@/models/Activity'
import 'jest'

describe('Get Results functions', () => {


    test('getPercentageResults returns proper % of questions answered correct', () => {
        const results = ["Correct","Incorrect"]
        expect(getPercentageResults(results,2)).toEqual("50.00%")
        const results2 = ["Incorrect", "Incorrect"]
        expect(getPercentageResults(results2,2)).toEqual("0.00%")
        const results3 = ["Correct", "Correct"]
        expect(getPercentageResults(results3,2)).toEqual("100.00%")
    })

    test('checkAnswer returns the correct result to users answer', () => {
        const questionObject = new Activity(5, "What was the call ?", ["Travel", "No Foul Call"], "Travel", "123")
        const rightResultsList = checkAnswer(questionObject, [], "Travel")
        expect(rightResultsList[0]).toEqual("Correct")
    })
})