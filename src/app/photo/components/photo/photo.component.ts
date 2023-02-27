import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '@core/models';
import { PhotoService, PHOTO_SERVICE } from '@core/services/photo/photo-service';
import { switchMap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
  photo$: Observable<Photo> = this.getPhoto();

  constructor(
    private readonly route: ActivatedRoute,
    @Inject(PHOTO_SERVICE) private readonly photoService: PhotoService
  ) { }

  private getPhoto(): Observable<Photo> {
    return this.route.params.pipe(
      switchMap(({ id }) => this.photoService.getPhoto(id))
    );
  }
}
