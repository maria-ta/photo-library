import { InjectionToken } from "@angular/core";
import { Photo } from "@core/models";
import { Observable } from "rxjs";

export interface PhotoService {
    getRandomPhoto(): Observable<Photo>;
    getRandomPhotos(n: number): Observable<Photo[]>;
}

export const PHOTO_SERVICE = new InjectionToken<PhotoService>('PhotoService');
