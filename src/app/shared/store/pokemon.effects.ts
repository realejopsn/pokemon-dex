import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as PokemonActions from './pokemon.actions';
import { PokemonService } from '../service/pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemons),
      switchMap((action) =>
        this.pokemonService.getPokemon(action.offset, action.limit).pipe(
          map(pokemons => PokemonActions.loadPokemonsSuccess({ pokemons })),
          catchError(error => of(PokemonActions.loadPokemonsFailure({ error })))
        )
      )
    )
  );

  loadPokemonDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.loadPokemonDetail),
      switchMap(({ id }) =>
        this.pokemonService.getPokemonDetail(id).pipe(
          map(pokemonDetail => PokemonActions.loadPokemonDetailSuccess({ pokemonDetail })),
          catchError(error => of(PokemonActions.loadPokemonDetailFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private pokemonService: PokemonService) { }
}
