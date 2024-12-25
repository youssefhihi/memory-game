import { Injectable } from '@angular/core';
import { Result } from '../../types/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
private result: Result[] = [];
  constructor() { }


  setResult(result: Result) {
    result.id = this.result.length + 1;
    this.result.push(result);
  }

  getResults(): Result[] {
    return this.result;
  }

}
