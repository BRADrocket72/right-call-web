import { UserDb } from "../db/UserDb";
import { UserDto } from "../model/UserDto";
import UserSchema from "./schemas/UserSchema";
import { IUserDoc } from "./schemas/UserSchema";

class User implements UserDb{
    async createUser(user:UserDto) {
        const data = new UserSchema({
            userName: user.userName,
            email:user.email,
            password: user.password,
            userType: user.userType,
            salt: user.salt
        })
        const dataToSave = await data.save()
        return dataToSave
    }

    async getAll(): Promise<IUserDoc[]> {
        const data = await UserSchema.find()
        return data;
    }
    async findUserById(userId: string): Promise<IUserDoc> {
        const data = await UserSchema.findById(userId);
        return data;
    }
    async findUserByUsername(username: string): Promise<IUserDoc> {
        const data = await UserSchema.findOne({userName : username})
        return data
    }
    async findUserByEmail(email: string): Promise<IUserDoc> {
        const data = await UserSchema.findOne({email : email})
        return data
    }
    async deleteUser(userId: string): Promise<IUserDoc> {
        const data = await UserSchema.findByIdAndDelete(userId);
        return data;
    }
}
export default User