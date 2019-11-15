import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'reverse'
})
@Injectable({
    providedIn: "root"
})
export class ReversePipe implements PipeTransform {

  transform(value) {
      if (!value) return;

      return value.reverse();
    }
}