import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Pokemon } from '../models/pokemon.model';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getType(pokemon: Pokemon): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  getPokemon(offset: number, limit: number): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.API_URL}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
  }

  getPokemonDetail(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}/pokemon/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    return throwError(() => error);
  }
}
