import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String
    },
    userId: {
        type: mongoose.Types.ObjectId
    }
})

export interface Exercise {
    description: string;
    duration: number;
    date: string;
    userId: string;
}

export interface ResultType {
    username: string,
    _id: string,
    count?: number,
    log?: { description: string, duration: number, date: string }[]
}