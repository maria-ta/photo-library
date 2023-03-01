import { of } from 'rxjs';

import { PhotoService } from './photo.service';

const PHOTO_MOCK_DETAILS_MOCK: any = { id: 'mock-id', description: 'mock details' };
const PHOTO_DETAILS_MOCK: any = { id: 'id-12345', description: 'details' };

describe('PhotoService', () => {
  let service: PhotoService;

  let configServiceMock: any;
  let photoMockServiceMock: any;
  let photoBeServiceMock: any;

  beforeEach(() => {
    configServiceMock = {
      isConfigured: jasmine.createSpy().and.returnValue(false),
    };
    photoMockServiceMock = {
      getRandomPhoto: jasmine.createSpy().and.returnValue(of(PHOTO_MOCK_DETAILS_MOCK)),
      getRandomPhotos: jasmine.createSpy().and.returnValue(of([PHOTO_MOCK_DETAILS_MOCK])),
      getPhoto: jasmine.createSpy().and.callFake((id) => of({ ...PHOTO_MOCK_DETAILS_MOCK, id })),
    };
    photoBeServiceMock = {
      getRandomPhoto: jasmine.createSpy().and.returnValue(of(PHOTO_DETAILS_MOCK)),
      getRandomPhotos: jasmine.createSpy().and.returnValue(of([PHOTO_DETAILS_MOCK])),
      getPhoto: jasmine.createSpy().and.callFake((id) => of({ ...PHOTO_DETAILS_MOCK, id })),
    };
    service = new PhotoService(configServiceMock, photoMockServiceMock, photoBeServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRandomPhoto', () => {
    it('should return mock data when no configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(false);

      service.getRandomPhoto()
        .subscribe((photo) => {
          expect(photo).toEqual(PHOTO_MOCK_DETAILS_MOCK);
          done();
        });
    });

    it('should real data when there is a configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(true);

      service.getRandomPhoto()
        .subscribe((photo) => {
          expect(photo).toEqual(PHOTO_DETAILS_MOCK);
          done();
        });
    });
  });

  describe('#getRandomPhotos', () => {
    const n = 3;

    it('should return mock data when no configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(false);

      service.getRandomPhotos(n)
        .subscribe((photo) => {
          expect(photo).toEqual([PHOTO_MOCK_DETAILS_MOCK]);
          done();
        });
    });

    it('should real data when there is a configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(true);

      service.getRandomPhotos(n)
        .subscribe((photo) => {
          expect(photo).toEqual([PHOTO_DETAILS_MOCK]);
          done();
        });
    });
  });

  describe('#getPhoto', () => {
    const id = 'id-1';

    it('should return mock data when no configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(false);

      service.getPhoto(id)
        .subscribe((photo) => {
          expect(photo).toEqual({ ...PHOTO_MOCK_DETAILS_MOCK, id });
          done();
        });
    });

    it('should real data when there is a configuration', (done) => {
      configServiceMock.isConfigured.and.returnValue(true);

      service.getPhoto(id)
        .subscribe((photo) => {
          expect(photo).toEqual({ ...PHOTO_DETAILS_MOCK, id });
          done();
        });
    });
  });
});
