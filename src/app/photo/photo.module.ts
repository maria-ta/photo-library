import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './components/photo/photo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    MatButtonModule,
  ]
})
export class PhotoModule { }
