import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string | number | object | null | undefined) {
    return (
      (typeof value === 'string' &&
        value.charAt(0).toUpperCase() + value.slice(1)) ||
      value
    );
  }
}
