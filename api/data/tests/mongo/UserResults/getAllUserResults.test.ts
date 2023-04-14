import UserResultsSchema from "../../../mongo/schemas/UserResultsSchema"
import UserResults from "../../../mongo/UserResults"

let testUserA;
let testUserB;

const testMongoDb = require('../testMongoDb')
const userResultsCollection :UserResults =  new UserResults()

beforeEach(async () => {
    const userOne =new UserResultsSchema({username:"batman" ,score:75,quizId:"1", quizName:"2", questionTimes:[]})
    const userTwo =new UserResultsSchema({username:"Robin" ,score:50, quizId:"a", quizName:"b", questionTimes:[]})
    
    testUserA = await userOne.save();
    testUserB = await userTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Get all User Results',()=>{
    it('First Activity', async () => {
        const AllUserResults = await userResultsCollection.getAllUserResults();
       
        expect(AllUserResults.length).toEqual(2);
        expect(AllUserResults[0].id).toEqual(testUserA.id);
        expect(AllUserResults[1].id).toEqual(testUserB.id);
    })
})