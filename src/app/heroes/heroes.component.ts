import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero/Hero';
import { MessagesService } from '../messages.service';

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

  private retrieveHeroes(): void {
    this.heroService.publishHeroes().subscribe(heroes => this.heroes = heroes);
    this.messagesService.add('HeroComponent: Retrieved heroes.');
  }

}
