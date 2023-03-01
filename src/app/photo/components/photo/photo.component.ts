import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { APP_TITLE_POSTFIX } from '@core/constants/app-title';
import { Photo } from '@core/models';
import { FavoritesService, PhotoService } from '@core/services';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnDestroy {
  photo?: Photo;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly photoService: PhotoService,
    private readonly favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.getPhoto()
      .pipe(
        tap((photo) => {
          this.photo = photo;
          // eslint-disable-next-line max-len
          this.title.setTitle(`${photo.description} - Photo by ${photo.user.name}${APP_TITLE_POSTFIX}`);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFavorites(): void {
    if (this.photo) {
      this.favoritesService.toggleFavorites(this.photo);
    }
  }

  private getPhoto(): Observable<Photo> {
    return this.route.params.pipe(
      switchMap(({ id }) => this.photoService.getPhoto(id))
    );
  }
}
