import { createReducer, on } from '@ngrx/store';

import { Pokemon, PokemonList } from '../models/pokemon.model';
import * as PokemonActions from './pokemon.actions';

export const pokemonFeatureKey = 'pokemon';

export interface State {
  pokemons: PokemonList[];
  selectedPokemonDetail: Pokemon | null;
}

export const initialState: State = {
  pokemons: [],
  selectedPokemonDetail: null
};

function stateUpdate(state: State, updatedValues: Partial<State>): State {
  return { ...state, ...updatedValues };
}

export const reducer = createReducer(
  initialState,

  on(PokemonActions.loadPokemonsSuccess, (state, action) =>
    stateUpdate(state, { pokemons: action.pokemons })
  ),

  on(PokemonActions.loadPokemonDetailSuccess, (state, action) =>
    stateUpdate(state, { selectedPokemonDetail: action.pokemonDetail })
  )
);
