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
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    const salvos = localStorage.getItem('favoritePokemons');
    this.favoritePokemons = salvos ? JSON.parse(salvos) : [];
  }

  removerDosFavoritos(pokemon: any) {
    this.favoritePokemons = this.favoritePokemons.filter(p => p.id !== pokemon.id);
    localStorage.setItem('favoritePokemons', JSON.stringify(this.favoritePokemons));

    const salvosSet = localStorage.getItem('favorites');
    if (salvosSet) {
      const favoritosSet = new Set<number>(JSON.parse(salvosSet));
      favoritosSet.delete(pokemon.id);
      localStorage.setItem('favorites', JSON.stringify([...favoritosSet]));
    }
  }
}