import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components';
import { UnsplashLinkPipe } from './pipes/unsplash-link.pipe';

const COMPONENTS = [
  HeaderComponent
];

const PIPES = [
  UnsplashLinkPipe
];

@NgModule({
  declarations: [
    HeaderComponent,
    UnsplashLinkPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES
  ]
})
export class SharedModule { }
