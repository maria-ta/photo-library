import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '@core/services';

@Pipe({
  name: 'unsplashLink'
})
export class UnsplashLinkPipe implements PipeTransform {
  constructor(
    private readonly configService: ConfigService
  ) { }

  transform(value: string): string {
    const appName = this.configService.getConfig()?.appName;
    return `${value}?utm_source=${appName}&utm_medium=referral`;
  }
}
