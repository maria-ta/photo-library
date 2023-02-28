import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { PHOTO_SERVICE } from '@core/services';
import { PhotoMockService } from '@core/services';
import { BROWSER_STORAGE } from '@core/injection-tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    { provide: PHOTO_SERVICE, useClass: PhotoMockService },
    { provide: Window, useValue: window },
    { provide: BROWSER_STORAGE, useValue: localStorage }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
