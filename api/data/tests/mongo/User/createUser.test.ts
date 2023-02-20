import { UserDto } from '../../../model/UserDto'
import User from '../../../mongo/User'
import UserSchema from '../../../mongo/schemas/UserSchema'


const testMongoDb = require('../testMongoDb')
const userCollection :User =  new User()

beforeAll(async () => await testMongoDb.connect())

afterEach(async () => await testMongoDb.clearDatabase())

afterAll(async () => await testMongoDb.closeDatabase())

describe('add User',()=>{
    it("create User",async()=>{
        const userOne: UserDto = {userName:"user1",email:'email@mail.com',password:'passwordHashed',userType:"admin",salt:'mortons'}
        const userResult = await userCollection.createUser(userOne);
        const foundUser = await UserSchema.findById(userResult._id);

        expect(foundUser.userName).toEqual(userResult.userName)
        expect(foundUser.email).toEqual(userResult.email)
        expect(foundUser.password).toEqual(userResult.password)
        expect(foundUser.userType).toEqual(userResult.userType)
        expect(foundUser.salt).toEqual(userResult.salt)

    })
})