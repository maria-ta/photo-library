import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PHOTOS_MOCK } from '@core/constants/photo';
import { PhotoService } from './photo-service';
import { Photo } from '@core/models';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoMockService implements PhotoService {

  constructor(
    private readonly utilsService: UtilsService,
  ) { }

  getRandomPhoto(): Observable<Photo> {
    return of(this.utilsService.getRandomElementFromArray(PHOTOS_MOCK));
  }

  getRandomPhotos(n: number): Observable<Photo[]> {
    return of(PHOTOS_MOCK.slice(0, n));
  }
}
