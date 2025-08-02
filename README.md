# Pokédex App

[![Ionic Framework](https://img.shields.io/badge/Ionic-Framework-3880ff?logo=ionic&logoColor=white)](https://ionicframework.com/)  
[![Angular](https://img.shields.io/badge/Angular-v16.2.7-red?logo=angular&logoColor=white)](https://angular.io/)

## Como funciona

- Na **página inicial**, é exibida uma lista de Pokémons. Clicando em um card, o usuário é redirecionado para a **página de detalhes**.
- Na **página de detalhes**, são mostradas informações como **altura**, **peso**, **experiência base**, **tipo**, **habilidade** e **ordem** do Pokémon.
- Cada card de Pokémon na página inicial possui uma **estrela** que pode ser clicada para **favoritar** o Pokémon. Após favoritar, o usuário é redirecionado automaticamente para a **página de favoritos**.
- Na **página de favoritos**, cada Pokémon pode ser **removido** da lista clicando no botão `"✕"` no canto superior direito do card.
- O usuário pode acessar a **página de favoritos** diretamente pela opção no **navbar** da página inicial.

## Acessibilidade e Responsividade

O layout foi construído com **media queries** para se adaptar a diferentes tamanhos de tela.  
A navegação é clara e acessível para usuários com diferentes necessidades.

## Paginação

A paginação foi implementada utilizando a biblioteca `ngx-pagination`.  
Todos os Pokémons são carregados de uma só vez e, visualmente, são divididos em páginas na interface.

## Injeção de Dependência

O serviço `PokeapiService` foi injetado via **construtor** nos componentes, sendo responsável por se comunicar com a **PokéAPI**, uma API pública que fornece dados dos Pokémons.

## Testes de Unidade

O projeto conta com **testes de unidade** usando o framework **Jasmine + Karma**, cobrindo os principais componentes e serviços.  
Testes simulam cliques, chamadas de métodos e interações com o DOM.

## Integração com Webhook

Foi configurado um **webhook com o GitHub**, permitindo integração automática entre os commits do repositório e ações externas, como notificações ou deploy local via ngrok.

## Bibliotecas Utilizadas

- [Ionic](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [`ngx-pagination`](https://www.npmjs.com/package/ngx-pagination)
- [`rxjs`](https://rxjs.dev/)
- [`Jasmine`](https://jasmine.github.io/) e [`Karma`](https://karma-runner.github.io/) para testes