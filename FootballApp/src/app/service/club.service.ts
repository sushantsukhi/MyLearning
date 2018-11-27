import {Injectable} from '@angular/core';
import {Club} from '../football/club';
import {CLUBS} from '../mock-clubs';
import {MessageService} from './message.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ClubService {
  [x: string]: any;

  private clubsUrl = 'api/clubs';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getClubs(): Observable<Club[]> {
    // TODO: send the message _after_ fetching the clubs
    this.messageService.add('ClubService: clubs added!');
    return this.http.get<Club[]>(this.clubsUrl)
      .pipe(
      tap(clubs => this.log(`fetched clubs`)),
      catchError(this.handleError('getClubs', [])));
    // return of(CLUBS); -- This was from MOCK
  }

  /** GET club by id. Return `undefined` when id not found */
  getClubNo404<Data>(id: number): Observable<Club> {
    const url = `${this.clubsUrl}/?id=${id}`;
    return this.http.get<Club[]>(url)
      .pipe(
      map(clubs => clubs[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} club id=${id}`);
      }),
      catchError(this.handleError<Club>(`getClub id=${id}`))
      );
  }

  getClub(id: number): Observable<Club> {
    this.messageService.add(`ClubService: club selected id=${id}`);
    const url = `${this.clubsUrl}/${id}`;
    return this.http.get<Club>(url).
      pipe(
      tap(_ => this.log(`fetched club by id = ${id}`)),
      catchError(this.handleError<Club>('getClub id = ${id}')
      )
      );
    // return of(CLUBS.find(club => club.id === id)); -- This was from MOCK
  }

  /* GET clubs whose name contains search term */
  searchClubs(term: string): Observable<Club[]> {
    if (!term.trim()) {
      // if not search term, return empty club array.
      return of([]);
    }
    return this.http.get<Club[]>(`api/clubs/?name=${term}`).pipe(
      tap(_ => this.log(`found clubs matching "${term}"`)),
      catchError(this.handleError<Club[]>('searchClubs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new club to the server */
  addClub(club: Club): Observable<Club> {
    this.messageService.add('ClubService: club added!');
    return this.http.post<Club>(this.clubsUrl, club, httpOptions).pipe(
      tap((_club: Club) => this.log(`added club w/ id=${club.id}`)),
      catchError(this.handleError<Club>('addClub'))
    );
  }

  /** DELETE: delete the club from the server */
  deleteClub(club: Club | number): Observable<Club> {
    this.messageService.add('ClubService: club deleted!');
    const id = typeof club === 'number' ? club : club.id;
    const url = `${this.clubsUrl}/${id}`;

    return this.http.delete<Club>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted club id=${id}`)),
      catchError(this.handleError<Club>('deleteClub'))
    );
  }

  /** PUT: update the club on the server */
  updateClub(club: Club): Observable<any> {
    this.messageService.add('ClubService: club updated!');
    return this.http.put(this.clubsUrl, club, httpOptions).pipe(
      tap(_ => this.log(`updated club id=${club.id}`)),
      catchError(this.handleError<any>('updateClub'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
