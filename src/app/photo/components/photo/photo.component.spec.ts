import { fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PhotoComponent } from './photo.component';

const ID = 'id-12345';
const DESCRIPTION = 'description...';
const USERNAME = 'Username';
const PHOTO_DETAILS = {
  id: ID,
  user: {
    name: USERNAME,
  },
  description: DESCRIPTION,
};

describe('PhotoComponent', () => {
  let component: PhotoComponent;

  let routeMock: any;
  let titleMock: any;
  let photoServiceMock: any;
  let favoritesServiceMock: any;

  beforeEach(async () => {
    routeMock = {
      params: new BehaviorSubject<{ id: string }>({ id: ID }),
    };
    titleMock = {
      setTitle: jasmine.createSpy()
    };
    photoServiceMock = {
      getPhoto: jasmine.createSpy()
        .and.callFake((id) => of({ id, user: { name: USERNAME }, description: DESCRIPTION }))
    };
    favoritesServiceMock = {
      toggleFavorites: jasmine.createSpy()
    };
    component = new PhotoComponent(
      routeMock,
      titleMock,
      photoServiceMock,
      favoritesServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should get photo with proper id', fakeAsync(() => {
      component.ngOnInit();

      expect(component.photo).toEqual(PHOTO_DETAILS as any);
    }));

    it('should set page title', fakeAsync(() => {
      component.ngOnInit();

      expect(titleMock.setTitle)
        .toHaveBeenCalledWith(`${DESCRIPTION} - Photo by ${USERNAME} | PhotoLibrary App`);
    }));

    describe('when component was destroyed', () => {
      beforeEach(() => {
        photoServiceMock.getPhoto
          .and.callFake((id: string) => {
            return of({ id, user: { name: USERNAME }, description: DESCRIPTION })
              .pipe(
                delay(5000)
              );
          });
      });

      it('should not get photo', fakeAsync(() => {
        component.photo = undefined;

        component.ngOnInit();
        component.ngOnDestroy();
        tick(6000);

        expect(component.photo).toBeUndefined();
      }));

      it('should not set page title', fakeAsync(() => {
        component.ngOnInit();
        component.ngOnDestroy();
        tick(6000);

        expect(titleMock.setTitle).not.toHaveBeenCalled();
      }));
    });
  });

  describe('#toggleFavorites', () => {
    it('should toggle favorites', () => {
      component.photo = {} as any;

      component.toggleFavorites();

      expect(favoritesServiceMock.toggleFavorites).toHaveBeenCalled();
    });

    it('should toggle favorites', () => {
      component.photo = undefined;

      component.toggleFavorites();

      expect(favoritesServiceMock.toggleFavorites).not.toHaveBeenCalled();
    });
  });
});
