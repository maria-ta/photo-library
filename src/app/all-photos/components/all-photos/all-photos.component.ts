import {
  Component,
  ChangeDetectorRef,
  Inject,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { Photo } from '@core/models';
import { FavoritesService, PhotoService } from '@core/services';
import { Title } from '@angular/platform-browser';
import { APP_TITLE_POSTFIX } from '@core/constants/app-title';

const INITIAL_NUMBER_OF_PHOTOS_TO_LOAD = 9;
const NUMBER_OF_PHOTOS_TO_LOAD = 3;

const MIN_DIFF_REQUIRED_TO_LOAD_MORE = 200;

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];

  isLoading = false;

  @ViewChild('photosContainer') photosContainer?: ElementRef;

  private readonly load$ = new Subject<number>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(Window) private readonly window: Window,
    private readonly cd: ChangeDetectorRef,
    private readonly title: Title,
    private readonly photoService: PhotoService,
    private readonly favoritesService: FavoritesService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`All photos${APP_TITLE_POSTFIX}`);
    this.subscribeToLoadMore();
    this.loadMore(INITIAL_NUMBER_OF_PHOTOS_TO_LOAD);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll')
  scroll(): void {
    const element = this.photosContainer?.nativeElement;
    if (element && !this.isLoading) {
      const { bottom } = element.getBoundingClientRect();
      const viewportHeight = this.window.visualViewport?.height || 0;
      const shouldLoadMore = (bottom - viewportHeight) < MIN_DIFF_REQUIRED_TO_LOAD_MORE;
      if (shouldLoadMore) {
        this.loadMore();
      }
    }
  }

  loadMore(n = NUMBER_OF_PHOTOS_TO_LOAD): void {
    this.isLoading = true;
    this.load$.next(n);
  }

  toggleFavorite(photo: Photo): void {
    this.favoritesService.toggleFavorites(photo);
  }

  private subscribeToLoadMore(): void {
    this.load$
      .pipe(
        switchMap((n) => this.photoService.getRandomPhotos(n)),
        tap((photos) => {
          this.photos.push(...photos);
          this.isLoading = false;
          this.cd.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
