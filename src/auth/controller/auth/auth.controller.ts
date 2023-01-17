import { Controller, Get } from '@nestjs/common';
import { Post, Req, UseGuards } from '@nestjs/common';
import { Session } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id)
    session.authenticated = true; //para activar el session
    return session;
  }

  @UseGuards(AuthenticatedGuard)// para proteger y que no puedan meterse a partes protegidas
  @Get('status')
  async getAuthStatus(@Req() req: Request){
    return req.user;
  }
}
