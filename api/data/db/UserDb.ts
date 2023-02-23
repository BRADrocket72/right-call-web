import { UserDto } from "../model/UserDto"

export interface UserDb {
    findUserById(userId: string):Promise<IUserDoc>
    createUser(user:UserDto):Promise<IUserDoc>
    findUserByUsername(username:string):Promise<IUserDoc>
    findUserByEmail(email:string):Promise<IUserDoc>
    getAll():Promise<Array<IUserDoc>>
    deleteUser(userId:string):Promise<IUserDoc>
}