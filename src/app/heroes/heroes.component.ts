import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/Hero';
import { HEROES } from '../heroes-mock';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public selectedHero: Hero;
  public heroes: Hero[];

  constructor() {
    this.heroes = HEROES;
  }

  ngOnInit(): void {
  }

  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
