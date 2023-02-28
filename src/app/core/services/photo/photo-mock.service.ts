import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PHOTO_NAMES } from '@core/constants/photo';
import { PhotoServiceInterface } from './photo-service.interface';
import { Photo } from '@core/models';
import { UtilsService } from '../utils.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const MIN_DELAY = 200;
const MAX_DELAY = 300;

/**
 * To be used for local development when there is no need to call API.
 */
@Injectable({
  providedIn: 'root'
})
export class PhotoMockService implements PhotoServiceInterface {
  private readonly mockPhotos: Photo[] = PHOTO_NAMES
    .map((photoName) => this.getMockPhotoData(photoName));

  constructor(
    private readonly utilsService: UtilsService,
  ) { }

  getRandomPhoto(): Observable<Photo> {
    return of(this.utilsService.getRandomElementFromArray(this.mockPhotos))
      .pipe(
        delay(this.getRandomDelay())
      );
  }

  getRandomPhotos(n: number): Observable<Photo[]> {
    const arr: Photo[] = Array(n)
      .fill(n)
      .map(() => this.utilsService.getRandomElementFromArray(this.mockPhotos));
    return of(arr)
      .pipe(
        delay(this.getRandomDelay())
      );
  }

  getPhoto(id: string): Observable<Photo> {
    const photo = this.mockPhotos.find((photo) => photo.id === id);
    return photo ? of(photo) : throwError(() => new HttpErrorResponse({ status: 404 }));
  }

  private getMockPhotoData(photoName: string): Photo {
    return {
      id: photoName,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00",
      promoted_at: "2023-01-01T00:00:00",
      width: 3000,
      height: 2000,
      color: "#000000",
      blur_hash: "blur_hash",
      description: null,
      alt_description: "Alt description of the photo",
      urls: {
        raw: `/assets/images/${photoName}.jpg`,
        full: `/assets/images/${photoName}.jpg`,
        regular: `/assets/images/${photoName}.jpg`,
        small: `/assets/images/${photoName}.jpg`,
        thumb: `/assets/images/${photoName}.jpg`,
        small_s3: `/assets/images/${photoName}.jpg`,
      },
      links: {
        self: "self link",
        html: "html link",
        download: "download link",
        download_location: "download_location link"
      },
      likes: 123,
      liked_by_user: false,
      current_user_collections: [],
      sponsorship: null,
      topic_submissions: {},
      user: {
        id: "user-id-1",
        updated_at: "2023-01-01T00:00:00Z",
        username: "test_user_1",
        name: "Test User",
        first_name: "Test",
        last_name: "User",
        twitter_username: null,
        portfolio_url: null,
        bio: "Bio...",
        location: "Location",
        links: {
          self: "self",
          html: "html",
          photos: "photos",
          likes: "likes",
          portfolio: "portfolio",
          following: "following",
          followers: "followers"
        },
        profile_image: {
          small: "profile image small",
          medium: "profile image medium",
          large: "profile image large"
        },
        instagram_username: "instagram username",
        total_collections: 123,
        total_likes: 456,
        total_photos: 789,
        accepted_tos: true,
        for_hire: true,
        social: {
          instagram_username: "instagram username",
          portfolio_url: null,
          twitter_username: null,
          paypal_email: null
        }
      },
      exif: {
        make: "make",
        model: "model",
        name: "name",
        exposure_time: null,
        aperture: null,
        focal_length: null,
        iso: null
      },
      location: {
        name: null,
        city: null,
        country: null,
        position: {
          latitude: 0.0,
          longitude: 0.0
        }
      },
      views: 12345,
      downloads: 6789
    };
  }

  private getRandomDelay(): number {
    return this.utilsService.getRandomNumber(MIN_DELAY, MAX_DELAY);
  }
}
