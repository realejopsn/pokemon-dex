import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { PokemonService } from '../../shared/service/pokemon.service';
import { PokemonDetailViewComponent } from './pokemon-detail-view.component';

describe('PokemonDetailViewComponent', () => {
  let component: PokemonDetailViewComponent;
  let fixture: ComponentFixture<PokemonDetailViewComponent>;
  let storeMock: Partial<Store>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let pokemonServiceMock: PokemonService;

  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of(null)),
      dispatch: jasmine.createSpy()
    };
    activatedRouteMock = {
      snapshot: {
        title: 'Pokemon Detail',
        url: [],
        params: {},
        queryParams: {},
        fragment: null,
        data: {},
        outlet: '',
        component: null,
        routeConfig: null,
        root: {} as ActivatedRouteSnapshot,
        parent: null,
        firstChild: null,
        children: [],
        pathFromRoot: [],
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1'),
          has: jasmine.createSpy(),
          getAll: jasmine.createSpy(),
          keys: []
        },
        queryParamMap: {
          get: jasmine.createSpy(),
          has: jasmine.createSpy(),
          getAll: jasmine.createSpy(),
          keys: []
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [PokemonDetailViewComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    });

    fixture = TestBed.createComponent(PokemonDetailViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should increment pokemon id when nextPokemon called with true', () => {
    spyOn(window.history, 'pushState');
    spyOn(component, 'reloadPage');
    component.nextPokemon(true);
    expect(window.history.pushState).toHaveBeenCalledWith({}, 'pokemon-detail', '/pokemon-detail/2');
    expect(component.reloadPage).toHaveBeenCalled();
  });

  it('should decrement pokemon id when nextPokemon called with false', () => {
    spyOn(window.history, 'pushState');
    spyOn(component, 'reloadPage');
    component.nextPokemon(false);
    expect(window.history.pushState).toHaveBeenCalledWith({}, 'pokemon-detail', '/pokemon-detail/0');
    expect(component.reloadPage).toHaveBeenCalled();
  });

  it('should load pokemon details on init', () => {
    component.ngOnInit();
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

  it('should get correct pokemon id from route', () => {
    const id = component['getPokemonIdFromRoute']();
    expect(id).toBe(1);
  });

  it('should generate correct image URL for given pokemon id', () => {
    const url = component.getPokemonImageUrl(151);
    expect(url).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png');
  });
});
