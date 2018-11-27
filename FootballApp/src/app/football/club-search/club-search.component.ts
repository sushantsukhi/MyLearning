import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Club} from '../club';
import {ClubService} from '../../service/club.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-club-search',
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.css']
})

export class ClubSearchComponent implements OnInit {
  clubs$: Observable<Club[]>;
  private searchTerms = new Subject<string>();

  constructor(private clubService: ClubService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.clubs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.clubService.searchClubs(term)),
    );
  }
}
