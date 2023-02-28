/* eslint-disable max-len */
import { fakeAsync, tick } from '@angular/core/testing';
import { Photo } from '@core/models';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AllPhotosComponent } from './all-photos.component';

function getMockPhotoArrayOfLength(n: number) {
  return Array(n)
    .fill(n)
    .map((_, i) => {
      return { id: `id-${i}` };
    });
}

const DELAY_SECONDS = 10;
const DELAY_MILISECONDS = DELAY_SECONDS * 1000;
const AWAIT_DELAY_MILISECONDS = (DELAY_SECONDS + 1) * 1000;

const INITIAL_PHOTOS_MOCK: Photo[] = [
  { id: 'id-0' },
  { id: 'id-1' },
  { id: 'id-2' },

  { id: 'id-3' },
  { id: 'id-4' },
  { id: 'id-5' },

  { id: 'id-6' },
  { id: 'id-7' },
  { id: 'id-8' }
] as any;

const LOADED_MORE_PHOTOS_MOCK: Photo[] = [
  ...INITIAL_PHOTOS_MOCK,

  { id: 'id-0' },
  { id: 'id-1' },
  { id: 'id-2' },
] as any;

const VIEWPORT_HEIGHT = 600;

describe('AllPhotosComponent', () => {
  let component: AllPhotosComponent;

  let windowMock: any;
  let changeDetectorRefMock: any;
  let photoServiceMock: any;
  let favoritesServiceMock: any;

  beforeEach(async () => {
    windowMock = {
      visualViewport: {
        height: VIEWPORT_HEIGHT,
      }
    };
    changeDetectorRefMock = {
      detectChanges: jasmine.createSpy()
    };
    photoServiceMock = {
      getRandomPhotos: jasmine.createSpy()
        .and.callFake((n) => of(getMockPhotoArrayOfLength(n)).pipe(delay(DELAY_MILISECONDS))),
      getRandomPhoto: jasmine.createSpy().and.returnValue(throwError(() => ({}))),
    };
    favoritesServiceMock = {
      toggleFavourites: jasmine.createSpy()
    };
    component = new AllPhotosComponent(
      windowMock,
      changeDetectorRefMock,
      photoServiceMock,
      favoritesServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should get intial number of photos', fakeAsync(() => {
      component.ngOnInit();
      tick(AWAIT_DELAY_MILISECONDS);

      expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
      expect(changeDetectorRefMock.detectChanges).toHaveBeenCalled();
    }));

    it('should not update photos after component destroy', fakeAsync(() => {
      component.ngOnInit();
      component.ngOnDestroy();
      tick(AWAIT_DELAY_MILISECONDS);

      expect(component.photos).toEqual([]);
      expect(changeDetectorRefMock.detectChanges).not.toHaveBeenCalled();
    }));
  });

  describe('#scroll', () => {
    describe('when there is a container element and photos are not loading', () => {
      let nativeElementMock: any;

      beforeEach(() => {
        nativeElementMock = {
          getBoundingClientRect: jasmine.createSpy().and.returnValue({ bottom: 123 })
        };
        component.photosContainer = {
          nativeElement: nativeElementMock
        };
        component.isLoading = false;
      });

      it('should load 3 more photos when user scrolled almost to the bottom of the container', fakeAsync(() => {
        component.ngOnInit();
        tick(AWAIT_DELAY_MILISECONDS);
        component.scroll();
        tick(AWAIT_DELAY_MILISECONDS);

        expect(component.photos).toEqual(LOADED_MORE_PHOTOS_MOCK);
      }));

      it('should not load more photos when user did not scroll almost to the bottom of the container', fakeAsync(() => {
        nativeElementMock.getBoundingClientRect.and.returnValue({ bottom: VIEWPORT_HEIGHT + 200 + 1 });
        component.ngOnInit();
        tick(AWAIT_DELAY_MILISECONDS);

        component.scroll();
        tick(AWAIT_DELAY_MILISECONDS);

        expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
      }));
    });

    describe('when there is no container element', () => {
      beforeEach(() => {
        component.photosContainer = undefined;
        component.isLoading = false;
      });

      it('should not load more photos', fakeAsync(() => {
        component.ngOnInit();
        tick(AWAIT_DELAY_MILISECONDS);

        component.scroll();
        tick(AWAIT_DELAY_MILISECONDS);

        expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
      }));
    });

    describe('when there is no native container element', () => {
      beforeEach(() => {
        component.photosContainer = {
          nativeElement: undefined
        };
        component.isLoading = false;
      });

      it('should not load more photos', fakeAsync(() => {
        component.ngOnInit();
        tick(AWAIT_DELAY_MILISECONDS);

        component.scroll();
        tick(AWAIT_DELAY_MILISECONDS);

        expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
      }));
    });

    describe('when photos are already loading', () => {
      let nativeElementMock: any;

      beforeEach(() => {
        nativeElementMock = {
          getBoundingClientRect: jasmine.createSpy().and.returnValue({ bottom: 123 })
        };
        component.photosContainer = {
          nativeElement: nativeElementMock
        };
      });

      it('should not load more photos when user did not scroll almost to the bottom of the container', fakeAsync(() => {
        component.ngOnInit();
        tick(AWAIT_DELAY_MILISECONDS);
        component.isLoading = true;

        component.scroll();
        tick(AWAIT_DELAY_MILISECONDS);

        expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
      }));
    });
  });

  describe('#loadMore', () => {
    it('should get photos', fakeAsync(() => {
      component.ngOnInit();
      tick(AWAIT_DELAY_MILISECONDS);
      component.loadMore();
      tick(AWAIT_DELAY_MILISECONDS);

      expect(component.photos).toEqual(LOADED_MORE_PHOTOS_MOCK);
    }));

    it('should not update photos after component destroy', fakeAsync(() => {
      component.ngOnInit();
      tick(AWAIT_DELAY_MILISECONDS);
      component.loadMore();
      component.ngOnDestroy();
      tick(AWAIT_DELAY_MILISECONDS);

      expect(component.photos).toEqual(INITIAL_PHOTOS_MOCK);
    }));
  });

  describe('#toggleFavorite', () => {
    it('should toggle favorite for photo', () => {
      const photo = { id: 'photoId' } as any;

      component.toggleFavorite(photo);

      expect(favoritesServiceMock.toggleFavourites).toHaveBeenCalledWith(photo);
    });
  });
});
