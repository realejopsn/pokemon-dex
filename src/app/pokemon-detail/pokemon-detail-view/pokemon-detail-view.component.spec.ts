import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PokemonService } from '../../shared/service/pokemon.service';
import { PokemonDetailViewComponent } from './pokemon-detail-view.component';

describe('PokemonDetailViewComponent', () => {
  let component: PokemonDetailViewComponent;
  let fixture: ComponentFixture<PokemonDetailViewComponent>;
  let storeMock: any;
  let activatedRouteMock: any;
  let pokemonServiceMock: any;

  beforeEach(() => {
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of(null)),
      dispatch: jasmine.createSpy()
    };
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('1')
        }
      }
    };
    pokemonServiceMock = {
      getRandomColor: jasmine.createSpy().and.returnValues('red', 'green', 'blue')
    };

    TestBed.configureTestingModule({
      declarations: [PokemonDetailViewComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PokemonService, useValue: pokemonServiceMock }
      ]
    });

    fixture = TestBed.createComponent(PokemonDetailViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
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
