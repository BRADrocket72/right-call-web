import UserResultsSchema from "../../../mongo/schemas/UserResultsSchema"
import UserResults from "../../../mongo/UserResults"

const testMongoDb = require('../testMongoDb')
const userResultsCollection :UserResults =  new UserResults()

beforeEach(async () => {
    const userOne =new UserResultsSchema( {username:"Batman" ,score:"good",lessonId:"1", lessonName:"2"})
    const userTwo =new UserResultsSchema({username:"Robin" ,score:"bad",lessonId:"a", lessonName:"b"})

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
        expect(UserResultsOne[0].score).toEqual("bad");
    })
    it('Second User', async () => {
        const UserResultsTwo = await userResultsCollection.getResultsByUsername("Batman");
        expect(UserResultsTwo[0].score).toEqual("good");
    })
})
