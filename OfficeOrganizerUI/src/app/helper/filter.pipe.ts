import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({ name: 'users' })
export class FilterPipe implements PipeTransform {
  transform(values: User[], filter: string): User[] {
    if (!filter || filter.length === 0 || values.length === 0) {
      return values; 
    }

  
    const filteredValues = values.filter((value: User) => {
      const usernameFound =
        value.username.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const emailFound =
        value.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const roleFound =
        value.role.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      return usernameFound || emailFound || roleFound;
    });

    return filteredValues; 
}
}