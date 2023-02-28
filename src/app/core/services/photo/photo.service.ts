import { Injectable } from '@angular/core';
import { Photo } from '@core/models';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { PhotoBeService } from './photo-be.service';
import { PhotoMockService } from './photo-mock.service';
import { PhotoServiceInterface } from './photo-service.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements PhotoServiceInterface {
  constructor(
    private readonly configService: ConfigService,
    private readonly photoMockService: PhotoMockService,
    private readonly photoBeService: PhotoBeService,
  ) { }

  getRandomPhoto(): Observable<Photo> {
    if (this.configService.isConfigured()) {
      return this.photoBeService.getRandomPhoto();
    } else {
      return this.photoMockService.getRandomPhoto();
    }
  }

  getRandomPhotos(n: number): Observable<Photo[]> {
    if (this.configService.isConfigured()) {
      return this.photoBeService.getRandomPhotos(n);
    } else {
      return this.photoMockService.getRandomPhotos(n);
    }
  }

  getPhoto(id: string): Observable<Photo> {
    if (this.configService.isConfigured()) {
      return this.photoBeService.getPhoto(id);
    } else {
      return this.photoMockService.getPhoto(id);
    }
  }
}
