import { fakeAsync, flush } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ConfigService } from './config.service';

const HTTP_RESPONSE = { key: 'HTTP response mock' };

describe('ConfigService', () => {
  let service: ConfigService;

  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: jasmine.createSpy().and.callFake((url) => of({ ...HTTP_RESPONSE, url }))
    };
    service = new ConfigService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on creation', () => {
    it('should get config from server', fakeAsync(() => {
      const httpClientMock: any = {
        get: jasmine.createSpy().and.callFake((url) => of({ ...HTTP_RESPONSE, url }))
      };
      const service = new ConfigService(httpClientMock);
      flush();

      expect(service.getConfig()).toEqual({ ...HTTP_RESPONSE, url: '/api/config' } as any);
      expect(service.isConfigured()).toBeTrue();
    }));

    it('should set config to null when no config from server', fakeAsync(() => {
      const httpClientMock: any = {
        get: jasmine.createSpy().and.returnValue(of(undefined))
      };
      const service = new ConfigService(httpClientMock);
      flush();

      expect(service.getConfig()).toEqual(null);
      expect(service.isConfigured()).toBeFalse();
    }));

    it('should set config to null when error response from server', fakeAsync(() => {
      const httpClientMock: any = {
        get: jasmine.createSpy().and.returnValue(throwError(() => new Error()))
      };
      const service = new ConfigService(httpClientMock);
      flush();

      expect(service.getConfig()).toEqual(null);
      expect(service.isConfigured()).toBeFalse();
    }));
  });
});
