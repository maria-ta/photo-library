import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APP_TITLE_POSTFIX } from '@core/constants/app-title';
import { Photo } from '@core/models';
import { FavoritesService, PhotoService } from '@core/services';
import {
  combineLatest,
  Observable,
  of,
  OperatorFunction,
  switchMap
} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading = true;
  hasPhotos = true;

  photos$: Observable<Photo[]> = this.favoritesService.getFavorites$()
    .pipe(
      switchMap((ids) => {
        return combineLatest(
          ids.map((id) => this.photoService.getPhoto(id).pipe(catchError(() => of(null))))
        ).pipe(
          map((details) => details.filter((photo) => !!photo))
        );
      }) as OperatorFunction<string[], Photo[]>,
      tap((photos) => {
        this.isLoading = false;
        this.hasPhotos = !!photos.length;
      })
    ) as Observable<Photo[]>;

  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly favoritesService: FavoritesService,
    private readonly photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`Favorites${APP_TITLE_POSTFIX}`);
  }

  goToPhoto(photo: Photo): void {
    this.router.navigate(['/photo', photo.id]);
  }
}
