import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetalhesPage implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`).subscribe({
        next: (data) => {
          this.pokemon = data;
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes:', err);
        }
      });
    }
  }
}