import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
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
    async getLogs(
        @Param('_id') userId: string,
        @Query('from') from: string,
        @Query('to') to: string,
        @Query('limit') limit: number
    ) {
        if (!from && !to && !limit) {
            const result = await this.ExerciseService.getLogs(userId);
            return result;
        }
        else {
            let result = await this.ExerciseService.getLogs(userId);
            console.log("LENGTH", result.log.length, limit);
            console.log("Arr", result.log)
            if (from || to) {
                let newLog = result.log.filter((res) => {
                    if (from) {
                        if (new Date(res.date) >= new Date(from)) {
                            if (to) {
                                if (new Date(res.date) <= new Date(to)) return true;
                                else return false;
                            }
                            else return true;
                        }
                    }
                    else {
                        if (new Date(res.date) <= new Date(to)) return true;
                        else false;
                    }
                })

                result.log = [...newLog];
            }
            if (limit && limit < result.log.length) result.log.length = limit;
            return result;
        }
    }
}