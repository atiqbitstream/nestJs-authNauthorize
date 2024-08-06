import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Admin } from 'typeorm';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    
    @Post('login')
    signIn(@Body() signInDto: signInDTO) {
        return this.authService.signIn(signInDto.username, signInDto.password);
      }


    @UseGuards(AuthGuard,RolesGuard)
     @Roles(Role.USER)
    @Get('profile')
    getProfile(@Request() req)
    {
       return req.user;
    }

}
