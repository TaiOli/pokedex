# Pokédex App

[![Ionic Framework](https://img.shields.io/badge/Ionic-Framework-3880ff?logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-v16.2.7-red?logo=angular&logoColor=white)](https://angular.io/)


## Como funciona

- Na página inicial, exibe uma lista de Pokémons onde clicando no card do seu pokémon é direcionado para a página de detalhes.

- Na página detalhes, são exibido informações como altura, peso, experiência base, tipo, habilidade e ordem do seu pokémon.

- Cada card de pokémon na página inicial, possui uma estrela que pode ser clicada para favoritar o Pokémon preferido. Quando um Pokémon é favoritado, o usuário é automaticamente redirecionado para a página de favoritos.

- Na página de favoritos, cada Pokémon pode ser removido da lista clicando no botão "✕" no canto superior direito do card.

- Na página inicial é possível naavegar para a página de favoritos clicando na opção no navbar.


## Acessibilidade e Responsividade

 Media queries para criar layouts que se adaptam a diferentes tamanhos de tela e navegação simples para usuários com diferentes necessidades.

 ## Bibliotecas :

Uso de bibliotecas como ngx-pagination para paginação no front-end e também as bibliotecas padrão do Angular e Ionic

 ## Paginação:

 A paginação foi feita carregando uma lista grande de Pokémons de uma só vez e dividindo essa lista visualmente em páginas com ngx-pagination.

 ## Injeção de dependência:

O PokeapiServic foi injetado no componente via construtor para se comunicar com a com a PokéAPI que é uma API pública que fornece dados dos Pokémons.
