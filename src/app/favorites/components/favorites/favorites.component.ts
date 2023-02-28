import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { APP_TITLE_POSTFIX } from '@core/constants/app-title';
import { Photo } from '@core/models';
import { FavoritesService, PhotoService } from '@core/services';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  photos$: Observable<Photo[]> = this.favoritesService.getFavorites$()
    .pipe(
      switchMap((ids) => combineLatest(ids.map((id) => this.photoService.getPhoto(id))))
    );

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
