import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class DetalhesPage implements OnInit {
  pokemon: any;
  sexo: string = 'Desconhecido';
  fraquezas: string[] = [];
  evolucoes: { nome: string; cor: string }[] = [];

  valorMaximoStatus = 150;
  quantidadeDeMarcas = 15;

  constructor(
    private rota: ActivatedRoute,
    private http: HttpClient,
    private roteador: Router
  ) {}

  ngOnInit() {
    // Reage à mudança de rota (ex: clique em outra evolução)
    this.rota.paramMap.subscribe(params => {
      const nome = params.get('name');
      if (nome) {
        this.carregarDadosDoPokemon(nome);
      }
    });
  }

  carregarDadosDoPokemon(nome: string) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`).subscribe({
      next: (dados: any) => {
        this.pokemon = dados;

        const tipo = dados.types[0]?.type.name;

        this.buscarSexoDoPokemon(nome);
        this.buscarFraquezasDoTipo(tipo);
        this.buscarEvolucoesDoPokemon(nome);
      },
      error: (erro) => {
        console.error('Erro ao buscar detalhes do Pokémon:', erro);
      }
    });
  }

  buscarSexoDoPokemon(nome: string) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${nome.toLowerCase()}`).subscribe({
      next: (especie: any) => {
        const taxaDeGenero = especie.gender_rate;

        if (taxaDeGenero === -1) {
          this.sexo = 'Sem gênero';
        } else if (taxaDeGenero === 0) {
          this.sexo = '100% macho';
        } else if (taxaDeGenero === 8) {
          this.sexo = '100% fêmea';
        } else {
          const f = (taxaDeGenero / 8) * 100;
          const m = 100 - f;
          this.sexo = `${m}% macho / ${f}% fêmea`;
        }
      },
      error: (erro) => {
        console.error('Erro ao buscar informações de sexo do Pokémon:', erro);
      }
    });
  }

  buscarFraquezasDoTipo(tipo: string) {
    this.http.get(`https://pokeapi.co/api/v2/type/${tipo}`).subscribe({
      next: (dadosTipo: any) => {
        this.fraquezas = dadosTipo.damage_relations.double_damage_from.map((t: any) => t.name);
      },
      error: (erro) => {
        console.error('Erro ao buscar fraquezas do tipo:', erro);
      }
    });
  }

  buscarEvolucoesDoPokemon(nome: string) {
    this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${nome.toLowerCase()}`).subscribe({
      next: (especie: any) => {
        const urlEvolucao = especie.evolution_chain.url;

        this.http.get(urlEvolucao).subscribe({
          next: (cadeia: any) => {
            const nomesEvolucoes: string[] = [];
            let atual = cadeia.chain;

            while (atual) {
              nomesEvolucoes.push(atual.species.name);
              atual = atual.evolves_to?.[0];
            }

            const cores = ['#ffcb05', '#3b4cca', '#d62424']; 
            this.evolucoes = nomesEvolucoes.map((nome, indice) => ({
              nome,
              cor: cores[indice % cores.length],
            }));
          },
          error: erro => console.error('Erro ao buscar cadeia de evolução:', erro)
        });
      },
      error: erro => console.error('Erro ao buscar espécie do Pokémon:', erro)
    });
  }

  irParaEvolucao(nome: string) {
    this.roteador.navigate(['/detalhes', nome]);
  }

  criarMarcasDeProgresso(): number[] {
    return Array.from({ length: this.quantidadeDeMarcas }, (_, i) => (i + 1) * (this.valorMaximoStatus / this.quantidadeDeMarcas));
  }
}