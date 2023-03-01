import { UnsplashLinkPipe } from './unsplash-link.pipe';

const APP_NAME = 'test-12345';

describe('UnsplashLinkPipe', () => {
  let pipe: UnsplashLinkPipe;

  let configServiceMock: any;

  beforeAll(() => {
    configServiceMock = {
      getConfig: jasmine.createSpy().and.returnValue({ appName: APP_NAME })
    };
    pipe = new UnsplashLinkPipe(configServiceMock);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should add required query params to the url', () => {
    const originalUrl = 'url';
    const expectedUrl =
      `${originalUrl}?utm_source=${APP_NAME}&utm_medium=referral`;

    expect(pipe.transform(originalUrl)).toEqual(expectedUrl);
  });
});
