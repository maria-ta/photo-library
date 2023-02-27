import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { PhotoService, PHOTO_SERVICE } from '@core/services/photo/photo-service';
import { Photo } from '@core/models';

const NUMBER_OF_PHOTOS_TO_LOAD = 6;

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];

  private readonly load$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(PHOTO_SERVICE) private readonly photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.subscribeToLoadMore();
    this.loadMore();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMore(): void {
    this.load$.next();
  }

  private subscribeToLoadMore(): void {
    this.load$
      .pipe(
        switchMap(() => this.photoService.getRandomPhotos(NUMBER_OF_PHOTOS_TO_LOAD)),
        tap((photos) => this.photos.push(...photos)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
