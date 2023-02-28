import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'unsplashLink'
})
export class UnsplashLinkPipe implements PipeTransform {
  transform(value: string): string {
    return `${value}?utm_source=${environment.unsplashConfig.appName}&utm_medium=referral`;
  }
}
