import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { State } from '../../shared/store/pokemon.reducer';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/service/pokemon.service';
import { loadPokemonDetail } from '../../shared/store/pokemon.actions';

const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

@Component({
  selector: 'app-pokemon-detail-view',
  templateUrl: './pokemon-detail-view.component.html',
  styleUrls: ['./pokemon-detail-view.component.scss']
})
export class PokemonDetailViewComponent implements OnInit {
  backgroundColor = '';
  cardColor = '';
  pillColor = '';
  pokemon$: Observable<Pokemon | null>;
  public errorMessage: string | null = null;

  constructor(
    private store: Store<{ pokemon: State }>,
    private route: ActivatedRoute,
    public pokemonService: PokemonService
  ) {
    this.pokemon$ = this.store
      .select('pokemon', 'selectedPokemonDetail')
      .pipe(filter(pokemon => pokemon !== null));
  }

  ngOnInit(): void {
    this.setDistinctColors();
    this.loadPokemonDetails();
  }

  private setDistinctColors(): void {
    this.backgroundColor = this.pokemonService.getRandomColor();
    do {
        this.cardColor = this.pokemonService.getRandomColor();
    } while (this.cardColor === this.backgroundColor);

    do {
        this.pillColor = this.pokemonService.getRandomColor();
    } while (this.pillColor === this.backgroundColor || this.pillColor === this.cardColor);
}

  private loadPokemonDetails(): void {
    const id = this.getPokemonIdFromRoute();

    if (id) {
      this.store.dispatch(loadPokemonDetail({ id }));
    } else {
      this.errorMessage = "Invalid Pokémon ID provided!";
    }
  }

  private getPokemonIdFromRoute(): number | null {
    const idStr = this.route.snapshot.paramMap.get('id');
    return idStr ? +idStr : null;
  }

  getPokemonImageUrl(id: number): string {
    return `${BASE_IMAGE_URL}/${id}.png`;
  }

  goBack() {
    window.history.pushState( {} , 'pokemon-list', '/pokemon-list' );
    window.location.reload();
  }
  
  nextPokemon() {
    // eslint-disable-next-line prefer-const
    let id = Number(this.route.snapshot.paramMap.get('id')) + 1;
    window.history.pushState( {} , 'pokemon-detail', '/pokemon-detail/'+id );
    window.location.reload();
  }
}
