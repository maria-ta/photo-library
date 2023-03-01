import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '@core/models';
import { Observable } from 'rxjs';
import { PhotoServiceInterface } from './photo-service.interface';

@Injectable({
  providedIn: 'root'
})
export class PhotoBeService implements PhotoServiceInterface {
  private readonly rootUrl = '/api/photos';

  constructor(
    private readonly http: HttpClient
  ) { }

  getRandomPhoto(): Observable<Photo> {
    const fullUrl = `${this.rootUrl}/random`;
    return this.http.get<Photo>(fullUrl);
  }

  getRandomPhotos(n: number): Observable<Photo[]> {
    const fullUrl = `${this.rootUrl}/random?count=${n}`;
    return this.http.get<Photo[]>(fullUrl);
  }

  getPhoto(id: string): Observable<Photo> {
    const fullUrl = `${this.rootUrl}/${id}`;
    return this.http.get<Photo>(fullUrl);
  }
}
