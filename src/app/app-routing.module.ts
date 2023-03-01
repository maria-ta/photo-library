import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { configResolver } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./all-photos/all-photos.module').then((m) => m.AllPhotosModule),
    resolve: { config: configResolver }
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/photo.module').then((m) => m.PhotoModule),
    resolve: { config: configResolver }
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then((m) => m.FavoritesModule),
    resolve: { config: configResolver }
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
