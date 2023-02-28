import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '@core/models';
import { PhotoService } from '@core/services';
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
    private readonly photoService: PhotoService
  ) { }

  private getPhoto(): Observable<Photo> {
    return this.route.params.pipe(
      switchMap(({ id }) => this.photoService.getPhoto(id))
    );
  }
}
