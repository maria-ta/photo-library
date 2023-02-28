import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { APP_TITLE_POSTFIX } from '@core/constants/app-title';
import { Photo } from '@core/models';
import { PhotoService } from '@core/services';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit, OnDestroy {
  photo$: Observable<Photo> = this.getPhoto();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.photo$
      .pipe(
        tap((photo) => {
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

  private getPhoto(): Observable<Photo> {
    return this.route.params.pipe(
      switchMap(({ id }) => this.photoService.getPhoto(id))
    );
  }
}
