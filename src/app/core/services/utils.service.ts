import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  getRandomElementFromArray<T>(arr: T[]): T {
    const index =  this.getRandomNumber(0, arr.length - 1);
    return arr[index];
  }

  getRandomNumber(from: number, to: number): number {
    return Math.round(Math.random() * (to - from) + from);
  }
}
