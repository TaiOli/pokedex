import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesPage } from './favoritos.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritesPage,
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;

    component.favoritePokemons = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        types: [{ type: { name: 'grass' } }]
      }
    ];

    fixture.detectChanges();
  });

  // Teste 1: Verifica se componente é criado sem erros
  it('criar componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste 2: Verifica funcionamento do método removeFromFavorites
  it('chamar método removeFromFavorites ao clicar no botão de remover', () => {
    component.favoritePokemons = [
      {
        id: 1,
        name: 'bulbasaur',
        sprites: { front_default: 'url-da-imagem.png' },
        types: [{ type: { name: 'grass' } }]
      }
    ];
    fixture.detectChanges();

    spyOn(component, 'removeFromFavorites');

    // Seleciona o botão de remover
    const removeBtn = fixture.debugElement.query(By.css('.remove-button'));
    expect(removeBtn).toBeTruthy();  // Garante que existe no DOM

    // Simula o clique
    removeBtn.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(component.removeFromFavorites).toHaveBeenCalledWith(component.favoritePokemons[0]);
  });

});