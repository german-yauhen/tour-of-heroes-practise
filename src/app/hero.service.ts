import { Injectable } from '@angular/core';
import { HEROES } from "./heroes-mock";
import { Hero } from "./hero/hero";
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes: Hero[];

  constructor(private messagesService: MessagesService) {
    this.heroes = HEROES;
  }

  public getHeroes(): Hero[] {
    return this.heroes;
  }

  public publishHeroes(): Observable<Hero[]> {
    this.messagesService.add('HeroServie: Fetched heroes.');
    return of(this.heroes);
  }

}
