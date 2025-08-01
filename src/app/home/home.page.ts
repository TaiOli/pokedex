import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemon: any = null;
  pokemonName: string = 'pikachu';

  constructor(private pokeService: PokeapiService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokeService.getPokemon(this.pokemonName).subscribe({
      next: (data) => this.pokemon = data,
      error: (err) => console.error(err),
    });
  }
}