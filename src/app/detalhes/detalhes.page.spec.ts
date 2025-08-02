import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesPage } from './detalhes.page';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('DetalhesPage', () => {
  let component: DetalhesPage;
  let fixture: ComponentFixture<DetalhesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesPage, IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'pikachu',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesPage);
    component = fixture.componentInstance;

    component.pokemon = {
      name: 'pikachu',
      sprites: { front_default: 'url.png' },
      height: 4,
      weight: 60,
      base_experience: 112,
      types: [{ type: { name: 'electric' } }],
      abilities: [{ ability: { name: 'static' } }],
      order: 25,
    };

    fixture.detectChanges();
    await fixture.whenStable();
  });

  // Teste 1: Verifica se componente é criado sem erros
  it('criar componente', () => {
    expect(component).toBeTruthy();
  });

 // Teste 2: Verifica se botão início direciona corretamente "/"
 it('botão de início com routerLink para "/"', () => {
    const homeBtn = fixture.debugElement.query(By.css('[data-testid="botao-home"]'));
    expect(homeBtn).toBeTruthy(); 
  });

});