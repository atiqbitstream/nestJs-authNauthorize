import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {


    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async signIn(
        username: string,
        pass: string,
      ): Promise<{ accessToken: string, refreshToken:string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username, roles:[user.role] };
        // return {
        //   access_token: await this.jwtService.signAsync(payload),
        // };

        const accessToken = await this.jwtService.signAsync(payload,{
          expiresIn:'1h',
        })

        const refreshToken = await this.jwtService.signAsync(payload,{
          expiresIn:'7d',
          secret : 'refresh-access-token'
        })

        return {accessToken,refreshToken}
      }
      
}
