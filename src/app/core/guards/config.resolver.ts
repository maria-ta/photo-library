import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AppConfig } from '@core/models';
import { ConfigService } from '@core/services';

export const configResolver: ResolveFn<AppConfig | null> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ConfigService).getConfig$();
    };
