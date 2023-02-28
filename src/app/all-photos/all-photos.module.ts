import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AllPhotosRoutingModule } from './all-photos-routing.module';
import { AllPhotosComponent } from './components';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AllPhotosComponent
  ],
  imports: [
    CommonModule,
    AllPhotosRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class AllPhotosModule { }
