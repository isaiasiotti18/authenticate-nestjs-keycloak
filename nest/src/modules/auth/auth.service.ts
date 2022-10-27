import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
//bcrypt
@Injectable()
export class AuthService {
  private client_id = this.configService.get('KEYCLOAK_CLIENT_ID');
  private client_secret = this.configService.get('KEYCLOAK_CLIENT_SECRET');
  private grant_type = this.configService.get('KEYCLOAK_GRANT_TYPE');
  private url_gen_token = this.configService.get('KEYCLOAK_URL_GEN_TOKEN');

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        this.url_gen_token,
        new URLSearchParams({
          client_id: this.client_id,
          client_secret: this.client_secret,
          grant_type: this.grant_type,
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
//auth0 - jsonwebtoken
