import { ViewContainerRef } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Directive } from '@angular/core';
import { FavoritesService } from '@core/services/favorites.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appIfLiked]'
})
export class IfLikedDirective implements OnInit, OnDestroy {
  @Input() set appIfLiked(id: string) {
    this.photoId = id;
    this.idChanged$.next();
  }

  hasView = false;

  private photoId?: string;

  private readonly idChanged$ = new Subject<void>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
    private readonly favoritesService: FavoritesService
  ) { }

  ngOnInit(): void {
    this.subscribeToIdOrFavoritesChanges();
    this.idChanged$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToIdOrFavoritesChanges(): void {
    merge(
      this.favoritesService.getFavorites$(),
      this.idChanged$
    )
      .pipe(
        tap(() => {
          const isFavorite = !!this.photoId && this.favoritesService.isFavorite(this.photoId);
          if (isFavorite && !this.hasView) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.hasView = true;
          } else if (!isFavorite && this.hasView) {
            this.viewContainerRef.clear();
            this.hasView = false;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
