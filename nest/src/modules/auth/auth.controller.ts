import { RoleGuard } from './guards/role.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from './decorators/role.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.username, body.password);
  }

  //@Role('admin')
  @UseGuards(JwtGuard)
  @Get('test-auth')
  test(@Req() req: any) {
    console.log(req.user);
    return {
      name: 'Luiz Carlos',
    };
  }
}
