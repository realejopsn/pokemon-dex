import { Store } from '@ngrx/store';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { State } from '../../shared/store/pokemon.reducer';
import { loadPokemons } from '../../shared/store/pokemon.actions';
import { PokemonService } from 'src/app/shared/service/pokemon.service';
import { Pokemon, PokemonList } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list-view',
  templateUrl: './pokemon-list-view.component.html',
  styleUrls: ['./pokemon-list-view.component.scss']
})

export class PokemonListViewComponent implements OnInit {
  pokemons$: Observable<any>;
  currentPage = 1;
  itemsPerPage = 24;

  constructor(private store: Store<{ pokemon: State }>, private router: Router, public pokemonService: PokemonService) {
    this.pokemons$ = this.store.select('pokemon', 'pokemons')
      .pipe(
        mergeMap(pokemons => {
          return this.getDetailedPokemonInfo(pokemons);
        })
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

  getDetailedPokemonInfo(pokemons: PokemonList[]): Observable<PokemonList[]> {
    return forkJoin(
      pokemons.map(pokemon => {
        const pokemonId = this.getPokemonId(pokemon.url);
        return this.pokemonService.getPokemonDetail(pokemonId);
      })
    );
  }

  viewDetails(id: string): void {
    this.router.navigate(['/pokemon-detail',id]);
  }

  getPokemonId(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  }

  getType(pokemon: Pokemon): string {
    return this.pokemonService.getType(pokemon);
  }
}
