import { of } from 'rxjs';

import { PhotoBeService } from './photo-be.service';


describe('PhotoBeService', () => {
  let service: PhotoBeService;

  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: jasmine.createSpy().and.callFake((url) => of({ requestUrl: url }))
    };
    service = new PhotoBeService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRandomPhoto', () => {
    it('should get data from a proper endpoint', (done) => {
      service.getRandomPhoto()
        .subscribe((response) => {
          expect(response).toEqual({ requestUrl: '/api/photos/random' } as any);
          done();
        });
    });
  });

  describe('#getRandomPhotos', () => {
    it('should get data from a proper endpoint', (done) => {
      const n = 5;
      service.getRandomPhotos(n)
        .subscribe((response) => {
          expect(response).toEqual({ requestUrl: `/api/photos/random?count=${n}` } as any);
          done();
        });
    });
  });

  describe('#getPhoto', () => {
    it('should get data from a proper endpoint', (done) => {
      const id = 'id-1';
      service.getPhoto(id)
        .subscribe((response) => {
          expect(response).toEqual({ requestUrl: `/api/photos/${id}` } as any);
          done();
        });
    });
  });
});
