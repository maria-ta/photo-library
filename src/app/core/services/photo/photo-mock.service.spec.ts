import { PHOTO_NAMES } from '@core/constants/photo';
import { UtilsService } from '../utils.service';

import { PhotoMockService } from './photo-mock.service';


const RANDOM_ELEMENT_MOCK = { id: 'random-element-id' } as any;

describe('PhotoMockService', () => {
  let service: PhotoMockService;

  let utilsServiceMock: UtilsService;

  beforeEach(() => {
    utilsServiceMock = {
      getRandomElementFromArray: jasmine.createSpy().and.returnValue(RANDOM_ELEMENT_MOCK),
      getRandomNumber: jasmine.createSpy().and.returnValue(0)
    };
    service = new PhotoMockService(
      utilsServiceMock
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRandomPhoto', () => {
    it('should return a random element of a mock array', (done) => {
      service.getRandomPhoto()
        .subscribe((photo) => {
          expect(photo).toEqual(RANDOM_ELEMENT_MOCK);
          done();
        });
    });
  });

  describe('#getRandomPhotos', () => {
    it('should return a slice of a mock array', (done) => {
      const n = 2;
      service.getRandomPhotos(n)
        .subscribe((photos) => {
          expect(photos.length).toEqual(n);
          done();
        });
    });
  });

  describe('#getPhoto', () => {
    it('should return a photo with specified id from a mock array', (done) => {
      const id = PHOTO_NAMES[0];
      service.getPhoto(id)
        .subscribe((photo) => {
          expect(photo.id).toEqual(id);
          done();
        });
    });

    it('should throw an error when no photo with such id in a mock array', (done) => {
      const id = 'id-which-does-not-exist';
      service.getPhoto(id)
        .subscribe({
          error: (err) => {
            expect(err.status).toEqual(404);
            done();
          }
        });
    });
  });
});
