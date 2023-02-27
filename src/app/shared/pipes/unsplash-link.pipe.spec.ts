import { environment } from 'src/environments/environment';
import { UnsplashLinkPipe } from './unsplash-link.pipe';

describe('UnsplashLinkPipe', () => {
  let pipe: UnsplashLinkPipe;

  beforeAll(() => {
    pipe = new UnsplashLinkPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should add required query params to the url', () => {
    const originalUrl = 'url';
    const expectedUrl =
      `${originalUrl}?utm_source=${environment.unsplashConfig.appName}&utm_medium=referral`;

    expect(pipe.transform(originalUrl)).toEqual(expectedUrl);
  });
});
