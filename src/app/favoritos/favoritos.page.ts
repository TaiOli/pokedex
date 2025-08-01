import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule 
  ]
})
export class FavoritesPage implements OnInit {
  favoritePokemons: any[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const saved = localStorage.getItem('favoritePokemons');
    this.favoritePokemons = saved ? JSON.parse(saved) : [];
  }

  removeFromFavorites(pokemon: any) {
    
    this.favoritePokemons = this.favoritePokemons.filter(p => p.id !== pokemon.id);
    
    localStorage.setItem('favoritePokemons', JSON.stringify(this.favoritePokemons));

    const savedSet = localStorage.getItem('favorites');
    if (savedSet) {
      const favoriteIds = new Set<number>(JSON.parse(savedSet));
      favoriteIds.delete(pokemon.id);
      localStorage.setItem('favorites', JSON.stringify([...favoriteIds]));
    }
  }
}