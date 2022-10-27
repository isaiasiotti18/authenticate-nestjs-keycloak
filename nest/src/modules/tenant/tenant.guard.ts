import { TenantService } from './tenant.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private tenantService: TenantService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const subdomain = request.user.subdomain;

    this.tenantService.subdomain = subdomain;

    return this.tenantService
      .validateSubdomain()
      .then(() => {
        return true;
      })
      .catch((e) => {
        throw new NotFoundException(e.message);
      });
  }
}
