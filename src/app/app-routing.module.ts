import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./all-photos/all-photos.module').then((m) => m.AllPhotosModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/photo.module').then((m) => m.PhotoModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then((m) => m.FavoritesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
