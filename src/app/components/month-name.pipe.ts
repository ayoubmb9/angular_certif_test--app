import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(value: number): string {
    const   monthName = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"]; //pipe it
    return monthName[value - 1];
  }

}
