import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDataService {

  createDb() {
    const clubs = [
      {id: 1, name: 'Manchester United'},
      {id: 2, name: 'Manchester City'},
      {id: 3, name: 'Arsenal'},
      {id: 4, name: 'Chelsea'},
      {id: 5, name: 'Liverpool'},
      {id: 6, name: 'Tottenham Hotspur'}
    ];
    return {clubs};
  }
}
