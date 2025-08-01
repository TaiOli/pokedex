import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, HttpClientModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const names = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 'meowth'];
    const requests = names.map(name =>
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise()
    );

    Promise.all(requests)
      .then(results => {
        this.pokemons = results;
      })
      .catch(err => console.error(err));
  }
}