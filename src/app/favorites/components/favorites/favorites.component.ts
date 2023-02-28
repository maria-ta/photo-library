import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from '@core/models';
import { FavoritesService } from '@core/services/favorites.service';
import { PhotoService, PHOTO_SERVICE } from '@core/services/photo/photo-service';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  photos$: Observable<Photo[]> = this.favoritesService.getFavorites$()
    .pipe(
      switchMap((ids) => combineLatest(ids.map((id) => this.photoService.getPhoto(id))))
    );

  constructor(
    private readonly router: Router,
    private readonly favoritesService: FavoritesService,
    @Inject(PHOTO_SERVICE) private readonly photoService: PhotoService
  ) { }

  goToPhoto(photo: Photo): void {
    this.router.navigate(['/photo', photo.id]);
  }
}
