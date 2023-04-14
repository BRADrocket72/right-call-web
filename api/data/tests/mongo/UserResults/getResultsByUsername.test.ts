import UserResultsSchema from "../../../mongo/schemas/UserResultsSchema"
import UserResults from "../../../mongo/UserResults"

const testMongoDb = require('../testMongoDb')
const userResultsCollection :UserResults =  new UserResults()

beforeEach(async () => {
    const userOne =new UserResultsSchema( {username:"Batman" ,score:100.00, quizId:"1", quizName:"2", questionTimes:[]})
    const userTwo =new UserResultsSchema({username:"Robin" ,score:50, quizId:"a", quizName:"b", questionTimes:[]})

    await userOne.save();
    await userTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () =>{ 
    await testMongoDb.clearDatabase()
})

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get Results By Username',()=>{
    it('First User', async () => {
        const UserResultsOne = await userResultsCollection.getResultsByUsername("Robin");
        expect(UserResultsOne[0].score).toEqual(50);
    })
    it('Second User', async () => {
        const UserResultsTwo = await userResultsCollection.getResultsByUsername("Batman");
        expect(UserResultsTwo[0].score).toEqual(100.00);
    })
})
