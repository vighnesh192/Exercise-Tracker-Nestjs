import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ExercisesService } from "./exercises.service";

@Controller('/api/users/:_id')
export class ExercisesController {
    constructor(private readonly ExerciseService: ExercisesService) { }

    @Post('/exercises')
    async createExercise(
        @Param('_id') userId: string,
        @Body('description') description: string,
        @Body('duration') duration: string,
        @Body('date') date: string
    ) {
        const exercise = await this.ExerciseService.addExercise(userId, description, duration, date)
        return exercise;
    }

    @Get('/logs')
    async getLogs(@Param('_id') userId: string) {
        const result = await this.ExerciseService.getLogs(userId);
        return result;
    }
}