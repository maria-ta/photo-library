import { skip } from 'rxjs';
import { FavoritesService } from './favorites.service';

const MOCK_STORED_FAVORITES_STR = '["id-1"]';
const MOCK_STORED_FAVORITES = ["id-1"];

describe('FavoritesService', () => {
  let service: FavoritesService;

  let localStorageMock: any;

  beforeEach(() => {
    localStorageMock = {
      setItem: jasmine.createSpy(),
      getItem: jasmine.createSpy().and.returnValue(MOCK_STORED_FAVORITES_STR),
    };
    service = new FavoritesService(localStorageMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on service init', () => {
    it('should get favorites from local storage and emit them', (done) => {
      const localStorageMock = {
        setItem: jasmine.createSpy(),
        getItem: jasmine.createSpy().and.returnValue(MOCK_STORED_FAVORITES_STR),
      } as any;
      const service = new FavoritesService(localStorageMock);

      service.getFavorites$().subscribe((favorites) => {
        expect(favorites).toEqual(MOCK_STORED_FAVORITES);
        done();
      });
    });

    it('should emit empty array when no stored favorites', (done) => {
      const localStorageMock = {
        setItem: jasmine.createSpy(),
        getItem: jasmine.createSpy().and.returnValue(undefined),
      } as any;
      const service = new FavoritesService(localStorageMock);

      service.getFavorites$().subscribe((favorites) => {
        expect(favorites).toEqual([]);
        done();
      });
    });
  });

  describe('#isFavorite', () => {
    it('should return true when photo with such id is in favorites', () => {
      const id = 'id-1';

      expect(service.isFavorite(id)).toBeTrue();
    });

    it('should return false when photo with such id is not in favorites', () => {
      const id = 'id-12345';

      expect(service.isFavorite(id)).toBeFalse();
    });
  });

  describe('#toggleFavorites', () => {
    it('should add photo id to favorites when no such id in favorites', (done) => {
      const id = 'id-12345';
      service.getFavorites$()
        .pipe(skip(1))
        .subscribe((favorites) => {
          expect(favorites).toEqual([...MOCK_STORED_FAVORITES, id]);
          done();
        });

      service.toggleFavorites({ id } as any);
    });

    it('should remove photo id from favorites when there is such id in favorites', (done) => {
      const id = 'id-1';
      service.getFavorites$()
        .pipe(skip(1))
        .subscribe((favorites) => {
          expect(favorites).toEqual([]);
          done();
        });

      service.toggleFavorites({ id } as any);
    });
  });
});
