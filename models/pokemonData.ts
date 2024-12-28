export type PokemonData = {
  name: string;
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  abilities: [PokemonAbilityData];
  types: [PokemonTypeData];
};

type PokemonAbilityData = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

type PokemonTypeData = {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}