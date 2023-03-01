import { Photo } from '@core/models';
import { Observable } from 'rxjs';

export interface PhotoServiceInterface {
    getPhoto(id: string): Observable<Photo>;
    getRandomPhoto(): Observable<Photo>;
    getRandomPhotos(n: number): Observable<Photo[]>;
}
