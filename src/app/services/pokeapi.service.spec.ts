import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PokeapiService } from './pokeapi.service';

describe('PokeapiService', () => {
  let service: PokeapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] 
    });
    service = TestBed.inject(PokeapiService);
  });

  // Teste 1: Verifica se componente é criado sem erros
  it('Criar componente', () => {
    expect(service).toBeTruthy();
  });
});