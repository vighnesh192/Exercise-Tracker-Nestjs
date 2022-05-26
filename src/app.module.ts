import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ExercisesModule, MongooseModule.forRoot(
    "mongodb+srv://exercisetracker:exercisetracker@cluster0.d6joh.mongodb.net/?retryWrites=true&w=majority"
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
