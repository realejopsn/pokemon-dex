import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonListRoutingModule } from './pokemon-list-routing.module';
import { PokemonListViewComponent } from './pokemon-list-view/pokemon-list-view.component';


@NgModule({
  declarations: [
    PokemonListViewComponent
  ],
  imports: [
    CommonModule,
    PokemonListRoutingModule
  ]
})
export class PokemonListModule { }
