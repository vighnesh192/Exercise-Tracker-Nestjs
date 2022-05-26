import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersSerivce } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersSerivce) { }

    @Post()
    async createUser(
        @Body('username') username: string,
    ) {
        const user = await this.usersService.addUser(username);
        return user
    }

    @Get()
    async getUsers() {
        const users = await this.usersService.getUsers();
        return users;
    }

}
