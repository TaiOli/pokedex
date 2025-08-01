import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { forkJoin, Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, 
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  page: number = 1;           
  itemsPerPage: number = 6;   
  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeapiService.getPokemons(150, 0).subscribe(response => {
      const requests: Observable<any>[] = response.results.map((pokemon: any) =>
        this.pokeapiService.getPokemon(pokemon.name)
      );

      forkJoin(requests).subscribe((pokemonDetails: any[]) => {
        this.pokemons = pokemonDetails;
      });
    });
  }
}