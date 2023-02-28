import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '@core/injection-tokens';
import { Photo } from '@core/models';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const LOCALSTORAGE_KEY = 'favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly favorites$ = new BehaviorSubject<string[]>([]);

  constructor(
    @Inject(BROWSER_STORAGE) private readonly localStorage: Storage
  ) {
    this.getStoredFavorites();
  }

  getFavorites$(): Observable<string[]> {
    return this.favorites$.asObservable();
  }

  isFavorite(photoId: string): boolean {
    const currentFavorites = this.favorites$.value;
    const indexInFavorites = currentFavorites.indexOf(photoId);
    return indexInFavorites !== -1;
  }

  toggleFavourites(photo: Photo): void {
    const currentFavorites = this.favorites$.value;
    const indexInFavorites = currentFavorites.indexOf(photo.id);
    const isPhotoInFavorites = indexInFavorites !== -1;
    if (isPhotoInFavorites) {
      const newFavorites = [...currentFavorites];
      newFavorites.splice(indexInFavorites, 1);
      this.updateFavorites([...newFavorites]);
    } else {
      this.updateFavorites([...currentFavorites, photo.id]);
    }
  }

  private updateFavorites(newFavorites: string[]): void {
    this.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newFavorites));
    this.favorites$.next(newFavorites);
  }

  private getStoredFavorites(): void {
    const storedFavorites = JSON.parse(this.localStorage.getItem(LOCALSTORAGE_KEY) || 'null') || [];
    this.updateFavorites(storedFavorites);
  }
}
