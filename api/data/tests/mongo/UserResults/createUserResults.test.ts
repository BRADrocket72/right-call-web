import { UserResultsDto } from "../../../model/UserResultsDto"
import UserResultsSchema from "../../../mongo/schemas/UserResultsSchema"
import UserResults from "../../../mongo/UserResults"


const testMongoDb = require('../testMongoDb')
const userResultsCollection :UserResults =  new UserResults()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('Activity created when',()=>{
    it('First Activity', async () => {
        const UserResultsOne: UserResultsDto = {username:"batman",score:75.00, quizId:"lesson1", quizName:"First Lesson"}
        const UserResultsResult = await userResultsCollection.createUserResult(UserResultsOne);
        const foundUserResults = await UserResultsSchema.findById(UserResultsResult._id);
              
        expect(foundUserResults.username).toEqual("batman");
        expect(foundUserResults.score).toEqual(75.00);
        expect(foundUserResults.quizId).toEqual("lesson1");
        expect(foundUserResults.quizName).toEqual("First Lesson");
    })
})
