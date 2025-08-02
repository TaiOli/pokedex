import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomePage } from './home.page';
import { PokeapiService } from '../services/pokeapi.service';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let pokeapiServiceSpy: jasmine.SpyObj<PokeapiService>;
  let routerEventsSubject: Subject<Event>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<Event>();

    const routerMock = jasmine.createSpyObj(
      'Router',
      ['navigate', 'createUrlTree', 'serializeUrl', 'navigateByUrl'],
      {
        events: routerEventsSubject.asObservable(),
      }
    );
    routerMock.navigate.and.returnValue(Promise.resolve(true));
    routerMock.navigateByUrl.and.callFake((url: any) => Promise.resolve(true));

    routerMock.createUrlTree.and.callFake((commands: any[]) => commands);
    routerMock.serializeUrl.and.callFake((url: any) => '/fake-url/' + url.join('/'));

    const pokeapiMock = jasmine.createSpyObj('PokeapiService', ['getPokemons', 'getPokemon']);

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        provideHttpClientTesting(),
        { provide: PokeapiService, useValue: pokeapiMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute, useValue: {
            params: of({}),
            snapshot: { paramMap: { get: () => null } }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    pokeapiServiceSpy = TestBed.inject(PokeapiService) as jasmine.SpyObj<PokeapiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    routerEventsSubject.next(new NavigationEnd(1, '/home', '/home'));
  });

  // Teste 1: Verifica se componente é criado sem erros
  it('criar componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Simula o carregamento dos pokémons na inicialização e verifica se a lista está correta
  it('carregar pokemons e atualizar favoritos no init', fakeAsync(() => {
    const dummyPokemons = [
      { id: 1, name: 'bulbasaur', sprites: { front_default: 'url1' }, types: [{ type: { name: 'grass' } }] },
      { id: 2, name: 'ivysaur', sprites: { front_default: 'url2' }, types: [{ type: { name: 'grass' } }] }
    ];

    pokeapiServiceSpy.getPokemons.and.returnValue(of({ results: [{ name: 'bulbasaur' }, { name: 'ivysaur' }] }));
    pokeapiServiceSpy.getPokemon.and.callFake((name: string) => {
      const poke = dummyPokemons.find(p => p.name === name);
      return of(poke);
    });

    component.ngOnInit();
    tick();

    expect(component.pokemons.length).toBe(2);
    expect(component.pokemons[0].name).toBe('bulbasaur');
    expect(pokeapiServiceSpy.getPokemons).toHaveBeenCalled();
  }));

  // Teste 3: Verifica a lógica de favoritar/desfavoritar um pokémon e navegação após favoritar
  it('alternar entre favoritos e navegar ao adicionar', () => {
    const pokemon = { id: 1, name: 'bulbasaur', sprites: { front_default: 'url1' }, types: [] };

    component.toggleFavorite(pokemon);
    expect(component.isFavorite(pokemon)).toBeTrue();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/favoritos']);

    component.toggleFavorite(pokemon);
    expect(component.isFavorite(pokemon)).toBeFalse();
  });

  // Teste 4: Deve navegar para a página de detalhes ao clicar no card
  it('deve navegar para a página de detalhes ao clicar no card', fakeAsync(() => {
    const dummyPokemon = {
      id: 1,
      name: 'bulbasaur',
      sprites: { front_default: 'url1' },
      types: []
    };

    pokeapiServiceSpy.getPokemons.and.returnValue(of({ results: [{ name: 'bulbasaur' }] }));
    pokeapiServiceSpy.getPokemon.and.returnValue(of(dummyPokemon));

    component.ngOnInit();
    tick();
    fixture.detectChanges();
    
    component['router'].navigate(['/detalhes', dummyPokemon.name]);
    tick();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/detalhes', 'bulbasaur']);
  }));

});