import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailViewComponent } from './pokemon-detail-view/pokemon-detail-view.component';

const routes: Routes = [
  { path: ':id', component: PokemonDetailViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonDetailRoutingModule { }

