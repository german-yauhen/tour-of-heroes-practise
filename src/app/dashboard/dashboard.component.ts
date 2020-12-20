import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private heroes: Hero[];
  private heroService: HeroService;

  constructor(heroService: HeroService) {
    this.heroService = heroService;
  }

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes().slice(1, 5);
  }

  public getHeroes(): Hero[] {
    return this.heroes;
  }

}
