import Answer from '@/models/Answer'
import {getEachQuestionResults} from '@/models/GetResults.js'
import {getPercentageResults} from '@/models/GetResults.js'
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
})