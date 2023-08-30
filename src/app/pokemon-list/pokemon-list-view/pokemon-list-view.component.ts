import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { State } from '../../shared/store/pokemon.reducer';
import { loadPokemons } from '../../shared/store/pokemon.actions';
import { PokemonService } from 'src/app/shared/service/pokemon.service';

@Component({
  selector: 'app-pokemon-list-view',
  templateUrl: './pokemon-list-view.component.html',
  styleUrls: ['./pokemon-list-view.component.scss']
})

export class PokemonListViewComponent implements OnInit {
  pokemons$: Observable<any>;
  currentPage = 1;
  itemsPerPage = 25;

  constructor(private store: Store<{ pokemon: State }>, private router: Router, public pokemonService: PokemonService) {
    this.pokemons$ = this.store.select('pokemon', 'pokemons')
      .pipe(
        map(pokemons => pokemons.map(pokemon => {
          return { ...pokemon, color: this.pokemonService.getRandomColor() }
        }))
      );
  }

  ngOnInit(): void {
    this.loadCurrentPage();
  }

  loadCurrentPage(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.store.dispatch(loadPokemons({ offset, limit: this.itemsPerPage }));
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCurrentPage();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrentPage();
    }
  }

  viewDetails(url: string): void {
    this.router.navigate(['/pokemon-detail', this.getPokemonId(url)]);
  }

  getPokemonId(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }
}
