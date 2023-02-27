import { fakeAsync, flush } from '@angular/core/testing';
import { Photo } from '@core/models';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AllPhotosComponent } from './all-photos.component';

const PHOTOS_MOCK: Photo[] = [
  { id: 'id-1' },
  { id: 'id-2' },
  { id: 'id-3' }
] as Photo[];

describe('AllPhotosComponent', () => {
  let component: AllPhotosComponent;

  let photoServiceMock: any;

  beforeEach(async () => {
    photoServiceMock = {
      getRandomPhotos: jasmine.createSpy().and.returnValue(of([])),
      getRandomPhoto: jasmine.createSpy().and.returnValue(throwError(() => ({}))),
    };
    component = new AllPhotosComponent(photoServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should get photos', () => {
      (photoServiceMock.getRandomPhotos as any)
        .and.returnValue(of([...PHOTOS_MOCK]));

      component.ngOnInit();

      expect(component.photos).toEqual(PHOTOS_MOCK);
    });

    it('should not update photos after component destroy', fakeAsync(() => {
      (photoServiceMock.getRandomPhotos as any)
        .and.returnValue(of([...PHOTOS_MOCK]).pipe(delay(10000)));

      component.ngOnInit();
      component.ngOnDestroy();
      flush();

      expect(component.photos).toEqual([]);
    }));
  });

  describe('#loadMore', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.photos = [];
    });

    it('should get photos', () => {
      (photoServiceMock.getRandomPhotos as any)
        .and.returnValue(of([...PHOTOS_MOCK]));

      component.loadMore();

      expect(component.photos).toEqual(PHOTOS_MOCK);
    });

    it('should not update photos after component destroy', fakeAsync(() => {
      (photoServiceMock.getRandomPhotos as any)
        .and.returnValue(of([...PHOTOS_MOCK]).pipe(delay(10000)));

      component.loadMore();
      component.ngOnDestroy();
      flush();

      expect(component.photos).toEqual([]);
    }));
  });
});
