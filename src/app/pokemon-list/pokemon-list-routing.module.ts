import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListViewComponent } from './pokemon-list-view/pokemon-list-view.component';

const routes: Routes = [
  { path: '', component: PokemonListViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonListRoutingModule { }
