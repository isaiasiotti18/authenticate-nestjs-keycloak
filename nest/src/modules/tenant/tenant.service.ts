import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  subdomain: string;

  async validateSubdomain(): Promise<string> {
    if (!this.subdomain) {
      throw new Error('Subdomain is not found!');
    }
    return this.subdomain;
  }
}
