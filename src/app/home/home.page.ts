import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { forkJoin, Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

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
  
  favorites: Set<number> = new Set();
  favoritePokemons: any[] = [];

  constructor(private pokeapiService: PokeapiService, private router: Router) {}

  ngOnInit() {
    this.carregarFavoritosDoStorage();
    this.carregarPokemons();
  }

  ionViewWillEnter() {
    this.carregarFavoritosDoStorage();
  }

  carregarFavoritosDoStorage() {
    const favoritosSalvos = localStorage.getItem('favoritePokemons');
    if (favoritosSalvos) {
      this.favoritePokemons = JSON.parse(favoritosSalvos);
      this.favorites = new Set(this.favoritePokemons.map(p => p.id));
    } else {
      this.favoritePokemons = [];
      this.favorites.clear();
    }
  }

  carregarPokemons() {
    this.pokeapiService.obterPokemons(150, 0).subscribe(response => {
      const pedidos: Observable<any>[] = response.results.map((pokemon: any) =>
        this.pokeapiService.obterPokemon(pokemon.name)
      );

      forkJoin(pedidos).subscribe((detalhesPokemons: any[]) => {
        this.pokemons = detalhesPokemons;
        this.atualizarPokemonsFavoritos();
        localStorage.setItem('allPokemons', JSON.stringify(this.pokemons));
      });
    });
  }

  alternarFavorito(pokemon: any) {
    if (this.favorites.has(pokemon.id)) {
      this.favorites.delete(pokemon.id);
      this.favoritePokemons = this.favoritePokemons.filter(p => p.id !== pokemon.id);
    } else {
      this.favorites.add(pokemon.id);
      this.favoritePokemons.push(pokemon);
      this.router.navigate(['/favoritos']);  
    }

    localStorage.setItem('favoritePokemons', JSON.stringify(this.favoritePokemons));
    localStorage.setItem('favorites', JSON.stringify([...this.favorites]));

    this.atualizarPokemonsFavoritos();
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.has(pokemon.id);
  }

  atualizarPokemonsFavoritos() {
    this.favoritePokemons = this.pokemons.filter(p => this.favorites.has(p.id));
  }
}