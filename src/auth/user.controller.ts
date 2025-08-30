import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Post()
    create(@Body() createUser: UserDto) {
    return this.userService.create(createUser);
  }
}
