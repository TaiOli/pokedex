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
    this.loadFavoritesFromStorage();
    this.loadPokemons();
  }

  ionViewWillEnter() {
    this.loadFavoritesFromStorage();
  }

  loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('favoritePokemons');
    if (savedFavorites) {
      this.favoritePokemons = JSON.parse(savedFavorites);
      this.favorites = new Set(this.favoritePokemons.map(p => p.id));
    } else {
      this.favoritePokemons = [];
      this.favorites.clear();
    }
  }

  loadPokemons() {
    this.pokeapiService.getPokemons(150, 0).subscribe(response => {
      const requests: Observable<any>[] = response.results.map((pokemon: any) =>
        this.pokeapiService.getPokemon(pokemon.name)
      );

      forkJoin(requests).subscribe((pokemonDetails: any[]) => {
        this.pokemons = pokemonDetails;
        this.updateFavoritePokemons();
        localStorage.setItem('allPokemons', JSON.stringify(this.pokemons));
      });
    });
  }

  toggleFavorite(pokemon: any) {
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

    this.updateFavoritePokemons();
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.has(pokemon.id);
  }

  updateFavoritePokemons() {
    this.favoritePokemons = this.pokemons.filter(p => this.favorites.has(p.id));
  }
}