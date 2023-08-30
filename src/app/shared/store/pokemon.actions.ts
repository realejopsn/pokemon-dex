import { createAction, props } from '@ngrx/store';

import { Pokemon, PokemonList } from '../models/pokemon.model';

export interface PokemonError {
  code: number;
  message: string;
}

export const loadPokemons = createAction('Load',
  props<{ offset: number, limit: number }>()
);

export const loadPokemonsSuccess = createAction(
  'Load Success',
  props<{ pokemons: PokemonList[] }>()
);

export const loadPokemonsFailure = createAction(
  'Load Failure',
  props<{ error: PokemonError }>()
);

export const loadPokemonDetail = createAction(
  'Load Detail',
  props<{ id: number }>()
);

export const loadPokemonDetailSuccess = createAction(
  'Load Detail Success',
  props<{ pokemonDetail: Pokemon }>()
);

export const loadPokemonDetailFailure = createAction(
  'Load Detail Failure',
  props<{ error: PokemonError }>()
);
