import { of } from 'rxjs';

import { FavoritesComponent } from './favorites.component';

const FAVORITES_MOCK = ['ID-123', 'abcdefg'];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;

  let routerMock: any;
  let titleMock: any;
  let favoritesServiceMock: any;
  let photoServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy(),
    };
    titleMock = {
      setTitle: jasmine.createSpy()
    };
    favoritesServiceMock = {
      getFavorites$: jasmine.createSpy().and.returnValue(of(FAVORITES_MOCK))
    };
    photoServiceMock = {
      getPhoto: jasmine.createSpy().and.callFake((id) => of({ id }))
    };
    component = new FavoritesComponent(
      routerMock,
      titleMock,
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
  });

  describe('#ngOnInit', () => {
    it('should set page title', () => {
      component.ngOnInit();

      expect(titleMock.setTitle).toHaveBeenCalledWith('Favorites | PhotoLibrary App');
    });
  });

  describe('#goToPhoto', () => {
    it('should toggle favorite for photo', () => {
      const photo = { id: 'photoId' } as any;

      component.goToPhoto(photo);

      expect(routerMock.navigate).toHaveBeenCalledWith(['/photo', photo.id]);
    });
  });
});
