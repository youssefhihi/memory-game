import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreFormat'
})
export class ScoreFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
