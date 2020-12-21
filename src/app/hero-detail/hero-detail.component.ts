import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero/Hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input()
  hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.retrieveHeroById();
  }

  public getHero(): Hero {
    return this.hero;
  }

  public goBack(): void {
    this.location.back();
  }

  private retrieveHeroById(): void {
    let heroId: number = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(heroId).subscribe(hero => this.hero = hero);
  }

}
