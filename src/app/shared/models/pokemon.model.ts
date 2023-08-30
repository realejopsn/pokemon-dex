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

interface SpriteSet {
  front_default: string | null;
  front_female: string | null;
}

interface HomeSpriteSet extends SpriteSet {
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface OfficialArtworkSpriteSet {
  front_default: string | null;
  front_shiny?: string | null;
}

interface RedBlueSpriteSet extends SpriteSet {
  back_gray: string | null;
  back_transparent: string | null;
  front_gray: string | null;
  front_transparent: string | null;
}

interface YellowSpriteSet extends RedBlueSpriteSet {}

interface CrystalSpriteSet extends SpriteSet {
  back_shiny: string | null;
  back_shiny_transparent: string | null;
  back_transparent: string | null;
  front_shiny: string | null;
  front_shiny_transparent: string | null;
  front_transparent: string | null;
}

interface GoldSpriteSet extends SpriteSet {
  back_shiny: string | null;
  front_shiny: string | null;
  front_transparent: string | null;
}

interface SilverSpriteSet extends GoldSpriteSet {}

interface BlackWhiteSpriteSet extends SpriteSet {
  animated: AnimatedSpriteSet;
  back_shiny: string | null;
  back_shiny_female: string | null;
}

interface AnimatedSpriteSet extends SpriteSet {
  back_shiny: string | null;
  back_shiny_female: string | null;
}

interface DiamondPearlSpriteSet extends SpriteSet { }
