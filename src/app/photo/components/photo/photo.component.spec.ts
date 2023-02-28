import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { PhotoComponent } from './photo.component';

const MOCK_ID = 'id-12345';

describe('PhotoComponent', () => {
  let component: PhotoComponent;

  let routeMock: any;
  let photoServiceMock: any;

  beforeEach(async () => {
    routeMock = {
      params: new BehaviorSubject<{ id: string }>({ id: MOCK_ID }),
    };
    photoServiceMock = {
      getPhoto: jasmine.createSpy().and.callFake((id) => of({ id }))
    };
    component = new PhotoComponent(
      routeMock,
      photoServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get observable to photo with proper id', (done) => {
    component.photo$.subscribe((photo) => {
      expect(photo).toEqual({ id: MOCK_ID } as any);
      done();
    });
  });
});
