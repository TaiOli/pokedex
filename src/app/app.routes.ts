import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { DetalhesPage } from './detalhes/detalhes.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'detalhes/:name', component: DetalhesPage },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.page').then( m => m.FavoritesPage)
  },
];