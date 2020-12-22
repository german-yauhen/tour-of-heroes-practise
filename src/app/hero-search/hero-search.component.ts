import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HeroService } from '../hero.service';
import { Hero } from '../hero/hero';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  foundHeroes$: Observable<Hero[]>;
  private searchTerms: Subject<string>;

  private heroService: HeroService;

  constructor(heroService: HeroService) {
    this.heroService = heroService;
    this.searchTerms = new Subject<string>();
  }

  ngOnInit(): void {
    this.foundHeroes$ = this.searchTerms.pipe(
      // wait 500ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  // public getFoundHeroes(): Observable<Hero[]> {
  //   if(this.foundHeroes$ === undefined) {
  //     return of([]);
  //   }
  //   return this.foundHeroes;
  // }

  public searchHeroes(term: string) {
    this.searchTerms.next(term);
  }

}
