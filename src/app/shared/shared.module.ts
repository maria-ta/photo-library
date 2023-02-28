import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent, PhotoCardComponent } from './components';
import { UnsplashLinkPipe } from './pipes/unsplash-link.pipe';
import { IfLikedDirective } from './directives/if-liked.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const COMPONENTS = [
  HeaderComponent,
  PhotoCardComponent,
];

const DIRECTIVES = [
  IfLikedDirective
];

const PIPES = [
  UnsplashLinkPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ]
})
export class SharedModule { }
