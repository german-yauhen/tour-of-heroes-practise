import { Injectable } from '@angular/core';
// import { HEROES } from "./heroes-mock";
import { Hero } from "./hero/hero";
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // private heroes: Hero[];
  private heroesUrl: string = 'api/heroes';  // URL to web api

  constructor(private messagesService: MessagesService, private httpClient: HttpClient) {
    // this.heroes = HEROES;
  }

  // public getHeroes(): Hero[] {
  //   return this.heroes;
  // }

  // public publishHeroes(): Observable<Hero[]> {
    // this.log('HeroServie: Fetched heroes.');
    // return of(this.heroes);
  // }

  // public publishHero(id: number): Observable<Hero> {
  //   this.log(`HeroService: Fetched hero with id=${id}`);
  //   let hero = this.heroes.find(hero => hero.id === id);
  //   return of(hero);
  // }

  public getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
            .pipe(
              tap(someValue => this.log('[GET] Requested heroes.')),
              catchError(this.handleError<Hero[]>('requestGetHeroes', []))
            );
  }

  public getHero(id: number): Observable<Hero> {
    let getByIdUrl: string = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(getByIdUrl)
            .pipe(
              tap(someValue => this.log(`[GET] Requested hero ${id}`)),
              catchError(this.handleError<Hero>(`requestGetHero ${id}`))
            )
  }

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

  private log(message: string): void {
    this.messagesService.add(message);
  }

}
