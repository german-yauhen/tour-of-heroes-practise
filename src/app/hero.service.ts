import { Injectable } from '@angular/core';
import { Hero } from "./hero/hero";
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messagesService: MessagesService,
              private httpClient: HttpClient) {
  }

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

  public updateHero(hero: Hero): Observable<void> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(someValue => this.log(`[PUT] Updated hero ${hero.id}`)),
      catchError(this.handleError<any>(`updateHero ${hero.id}`))
    );
  }

  public storeHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`[POST] Added new hero with id=${newHero.id}`)),
      catchError(this.handleError<Hero>('storeHero failed'))
    );
  }

  public deleteHero(hero: Hero): Observable<Hero> {
    let deleteUrl: string = `${this.heroesUrl}/${hero.id}`;
    return this.httpClient.delete<Hero>(deleteUrl, this.httpOptions).pipe(
      tap(() => this.log(`[DELETE] Deleted hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero failed'))
    );
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    let nameTerm: string = term.trim();
    if (nameTerm.length == 0) {
      return of([]);
    }
    let searchUrl: string = `${this.heroesUrl}/?name=${nameTerm}`;
    return this.httpClient.get<Hero[]>(searchUrl).pipe(
      tap(x => x.length
              ? this.log(`[GET] Found heroes matching "${term}"`)
              : this.log(`No heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes failed', []))
    );
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
