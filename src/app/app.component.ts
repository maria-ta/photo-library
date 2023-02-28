import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { APP_TITLE } from '@core/constants/app-title';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = APP_TITLE;
}
