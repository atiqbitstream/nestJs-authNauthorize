import { User } from './../users/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/public.decorator';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: signInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('refresh')
async refreshToken(@Body() refreshToken: string) {
  return this.authService.refreshToken(refreshToken);
}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.USER)
  @Post('protected')
  protectedRoute() {
    return 'This route is protected by RolesGuard';
  }
}
