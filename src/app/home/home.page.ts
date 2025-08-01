import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { forkJoin, Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [
    IonicModule,
    CommonModule,
    RouterModule
  ]
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  limit: number = 6;
  offset: number = 0;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeapiService.getPokemons(this.limit, this.offset).subscribe(response => {
      const requests: Observable<any>[] = response.results.map((pokemon: any) =>
        this.pokeapiService.getPokemon(pokemon.name)
      );

      forkJoin(requests).subscribe((pokemonDetails: any[]) => {
        this.pokemons = pokemonDetails;
      });
    });
  }

  nextPage() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }
}