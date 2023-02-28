import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './components/photo/photo.component';


@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    MatButtonModule,
  ]
})
export class PhotoModule { }
