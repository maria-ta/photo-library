import { PHOTOS_MOCK } from '@core/constants/photo';
import { UtilsService } from '../utils.service';

import { PhotoMockService } from './photo-mock.service';


const RANDOM_ELEMENT_MOCK = PHOTOS_MOCK[0];

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
          expect(photos).toEqual(PHOTOS_MOCK.slice(0, n));
          done();
        });
    });
  });

  describe('#getPhoto', () => {
    it('should return a photo with specified if from a mock array', (done) => {
      const id = 'id-1';
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
