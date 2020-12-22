import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero/Hero';
import { MessagesService } from '../messages.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  private heroes: Hero[];
  private heroService: HeroService;
  private messagesService: MessagesService;

  constructor(heroService: HeroService, messagesService: MessagesService) {
    this.heroService = heroService;
    this.messagesService = messagesService;
  }

  ngOnInit(): void {
    this.retrieveHeroes();
  }

  public getHeroes(): Hero[] {
    return this.heroes;
  }

  public createHero(heroName: string): void {
    if (heroName === undefined || heroName.length == 0) {
      throwError(new Error('Unable to create a hero with an empty name.'));
    }
    this.heroService.storeHero({ name: heroName } as Hero).subscribe(storedHero => {
      this.heroes.push(storedHero);
    });
  }

  public delete(hero: Hero): void {
    if (hero === undefined || hero.id === undefined) {
      throwError(new Error('Unable to delete a hero with unspecified id.'));
    }

    this.heroService.deleteHero(hero).subscribe();

    this.retrieveHeroes();
  }

  private retrieveHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    this.messagesService.add('HeroComponent: Retrieved heroes.');
  }

}
