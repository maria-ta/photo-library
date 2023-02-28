import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/models';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;
  private config$ = new ReplaySubject<AppConfig | null>();

  private readonly rootUrl = '/api/config';

  constructor(
    private readonly http: HttpClient
  ) {
    this.getConfiguration();
  }

  isConfigured(): boolean {
    return !!this.config;
  }

  getConfig(): AppConfig | null {
    return this.config ? { ...this.config } : null;
  }

  getConfig$(): Observable<AppConfig | null> {
    return this.config$.asObservable();
  }

  private getConfiguration(): void {
    this.http.get<AppConfig>(this.rootUrl).toPromise()
      .then((config) => {
        this.setConfig(config || null);
      })
      .catch(() => {
        this.setConfig(null);
      });
  }

  private setConfig(config: AppConfig | null): void {
    this.config = config || null;
    this.config$.next(this.config);
  }
}
