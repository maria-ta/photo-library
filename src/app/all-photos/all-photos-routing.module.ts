import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPhotosComponent } from './components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPhotosRoutingModule { }
