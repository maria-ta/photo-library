import { of } from 'rxjs';

import { FavoritesComponent } from './favorites.component';

const FAVORITES_MOCK = ['ID-123', 'abcdefg'];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;

  let favoritesServiceMock: any;
  let photoServiceMock: any;

  beforeEach(async () => {
    favoritesServiceMock = {
      getFavorites$: jasmine.createSpy().and.returnValue(of(FAVORITES_MOCK))
    };
    photoServiceMock = {
      getPhoto: jasmine.createSpy().and.callFake((id) => of({ id }))
    };
    component = new FavoritesComponent(
      favoritesServiceMock,
      photoServiceMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get ids of favorite photos and request corresponding details', (done) => {
    const expectedPhotosDetails = [
      { id: 'ID-123' },
      { id: 'abcdefg' }
    ] as any;

    component.photos$.subscribe((photos) => {
      expect(photos).toEqual(expectedPhotosDetails);
      done();
    });
  })
});
