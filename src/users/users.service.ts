import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UsersSerivce {

    // UserModel is a contructor function created by mongoose bts
    constructor(@InjectModel('User') private readonly UserModel: Model<User>) { }

    async addUser(username: string): Promise<{ username: string; _id: string }> {
        const newUser = new this.UserModel({
            username,
        });
        const user = await newUser.save();
        return { username, _id: user.id }
    }

    async getUsers() {
        const users = await this.UserModel.find();
        interface MyType {
            _id: Types.ObjectId;
            username: string;
        }
        const filtered = users.map((user) => {
            return { _id: user._id, username: user.username }
        })
        return filtered;
    }
}