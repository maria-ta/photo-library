import { fakeAsync, flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

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
    component = new PhotoComponent(
      routeMock,
      titleMock,
      photoServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get observable to photo with proper id', (done) => {
    component.photo$.subscribe((photo) => {
      expect(photo).toEqual(PHOTO_DETAILS as any);
      done();
    });
  });

  describe('#ngOnInit', () => {
    it('should set page title', fakeAsync(() => {
      component.ngOnInit();
      flush();

      expect(titleMock.setTitle)
        .toHaveBeenCalledWith(`${DESCRIPTION} - Photo by ${USERNAME} | PhotoLibrary App`);
    }));
  });
});
