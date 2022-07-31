import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/user.model";
import { Exercise, ResultType } from "./exercise.model";

@Injectable()
export class ExercisesService {
    constructor(
        @InjectModel('Exercise') private readonly ExerciseModel: Model<Exercise>,
        @InjectModel('User') private readonly UserModel: Model<User>
    ) { }

    async addExercise(userId: string, description: string, duration: string, date?: string) {
        const exercise = new this.ExerciseModel({
            description,
            duration,
            date: date ? new Date(date).toDateString() : new Date().toDateString(),
            userId
        })

        const user = await this.UserModel.findById(userId);

        const saved = await exercise.save();

        return {
            _id: user.id,
            username: user.username,
            description: saved.description,
            duration: saved.duration,
            date: saved.date,
        }
    }

    async getLogs(userId: string) {
        const user = await this.UserModel.findById(userId);

        // interface ResultType {
        //     username: string,
        //     _id: string,
        //     count?: number,
        //     log?: { description: string, duration: number, date: string }[]
        // }

        let data: ResultType = {
            username: user.username,
            _id: user.id
        }

        const count = await this.ExerciseModel.countDocuments({ userId })
        data = { ...data, count }

        const exercises = await this.ExerciseModel.find({ userId });
        const newExercises = exercises.map(({ description, duration, date }) => {
            return { description, duration, date }
        })
        data = { ...data, log: [...newExercises] }
        return data;
    }
}