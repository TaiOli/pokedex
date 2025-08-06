import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private urlBase = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  obterPokemons(limite: number, deslocamento: number): Observable<any> {
    return this.http.get(`${this.urlBase}/pokemon?limit=${limite}&offset=${deslocamento}`);
  }

  obterPokemon(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/pokemon/${nome}`);
  }

  obterTipo(tipo: string): Observable<any> {
    return this.http.get(`${this.urlBase}/type/${tipo}`);
  }

  obterEspeciePokemon(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/pokemon-species/${nome}`);
  }
}