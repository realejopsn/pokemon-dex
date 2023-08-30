import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/pokemon-list', pathMatch: 'full' },
  { path: 'pokemon-list', loadChildren: () => import('./pokemon-list/pokemon-list.module').then(m => m.PokemonListModule) },
  { path: 'pokemon-detail', loadChildren: () => import('./pokemon-detail/pokemon-detail.module').then(m => m.PokemonDetailModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
