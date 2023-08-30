import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonDetailRoutingModule } from './pokemon-detail-routing.module';
import { PokemonDetailViewComponent } from './pokemon-detail-view/pokemon-detail-view.component';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';


@NgModule({
  declarations: [
    PokemonDetailViewComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    PokemonDetailRoutingModule
  ]
})
export class PokemonDetailModule { }
