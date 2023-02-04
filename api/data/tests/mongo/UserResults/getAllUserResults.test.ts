import UserResultsSchema from "../../../mongo/schemas/UserResultsSchema"
import UserResults from "../../../mongo/UserResults"


const testMongoDb = require('../testMongoDb')
const userResultsCollection :UserResults =  new UserResults()

beforeEach(async () => {
    const userOne =new UserResultsSchema({username:"batman" ,score:"good",lessonId:"1", lessonName:"2"})
    const userTwo =new UserResultsSchema({username:"Robin" ,score:"bad",lessonId:"a", lessonName:"b"})
    
    await userOne.save();
    await userTwo.save();
})

beforeAll(async () => {await testMongoDb.connect()})

afterEach(async () => await testMongoDb.clearDatabase())

describe('Get all User Results',()=>{
    it('First Activity', async () => {
        const AllUserResults = await userResultsCollection.getAllUserResults();
        
        expect(AllUserResults.length).toEqual(2);
        expect(AllUserResults[0].score).toEqual("good");
        expect(AllUserResults[1].score).toEqual("bad");
    })
})