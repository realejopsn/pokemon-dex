export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  url: string;
  sprites: Sprites;
  stats: {
    base_stat:number,
    effort:number,
    stat:{
      name:string,
      url:string
    }
  }[]
}

export interface PokemonList {
  id: number;
  name: string;
  url: string;
}

interface Sprites {
  back_default: string | null ;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}


