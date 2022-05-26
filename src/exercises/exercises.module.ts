import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/user.model";
import { ExerciseSchema } from "./exercise.model";
import { ExercisesController } from "./exercises.controller";
import { ExercisesService } from "./exercises.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Exercise', schema: ExerciseSchema }]),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [ExercisesController],
    providers: [ExercisesService]
})

export class ExercisesModule { }