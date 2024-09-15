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

      async refreshToken( refreshToken: string): Promise<{ access_token: string }> {
        try {
          const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: 'refresh-token-secret',
          });
          
          const user = await this.usersService.findOne(payload.sub);
          const newPayload = { 
            sub: user.id, 
            username: user.username, 
            roles: [user.role] 
          };
          
          const newAccessToken = await this.jwtService.signAsync(newPayload, {
            expiresIn: '1h',
          });
          
          return { access_token: newAccessToken };
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
      
}
