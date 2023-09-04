import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { PokemonService } from 'src/app/shared/service/pokemon.service';
import { PokemonListViewComponent } from './pokemon-list-view.component';

describe('PokemonListViewComponent', () => {
    let component: PokemonListViewComponent;
    let fixture: ComponentFixture<PokemonListViewComponent>;
    let storeMock: any;
    let routerMock: any;
    let pokemonServiceMock: any;

    beforeEach(() => {
        storeMock = {
            select: jasmine.createSpy().and.returnValue(of([])),
            dispatch: jasmine.createSpy()
        };
        routerMock = {
            navigate: jasmine.createSpy()
        };
        pokemonServiceMock = {
            getRandomColor: jasmine.createSpy().and.returnValue('red')
        };

        TestBed.configureTestingModule({
            declarations: [PokemonListViewComponent],
            providers: [
                { provide: Store, useValue: storeMock },
                { provide: Router, useValue: routerMock },
                { provide: PokemonService, useValue: pokemonServiceMock }
            ]
        });

        fixture = TestBed.createComponent(PokemonListViewComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should load pokemons on init', () => {
        component.ngOnInit();
        expect(storeMock.dispatch).toHaveBeenCalled();
    });

    it('should increment currentPage and load pokemons on nextPage', () => {
        const initialPage = component.currentPage;
        component.nextPage();
        expect(component.currentPage).toBe(initialPage + 1);
        expect(storeMock.dispatch).toHaveBeenCalled();
    });

    it('should decrement currentPage and load pokemons on previousPage if currentPage is more than 1', () => {
        component.currentPage = 2;
        component.previousPage();
        expect(component.currentPage).toBe(1);
        expect(storeMock.dispatch).toHaveBeenCalled();
    });

    it('should not decrement currentPage on previousPage if currentPage is 1', () => {
        component.currentPage = 1;
        component.previousPage();
        expect(component.currentPage).toBe(1);
        expect(storeMock.dispatch).not.toHaveBeenCalled();
    });

    it('should correctly extract pokemon id from URL', () => {
        const id = component.getPokemonId('https://pokeapi.co/api/v2/pokemon/5/');
        expect(id).toBe(5);
    });
});
