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
        const AllUserResults = await userResultsCollection.getAllUserResults();
        
        expect(AllUserResults).toEqual("First Lesson");
    })
})