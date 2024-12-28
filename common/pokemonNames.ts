import { client } from "common/axiosClient"
import { PokemonData } from "models/pokemonData"
import { TypeData } from "models/typeData"

interface PokemonNamesResponse {
  count: number,
  prev: string | null,
  next: string | null,
  results: [PokemonNameResponse]
}

interface PokemonNameResponse {
  name: string,
  url: string
}

export const fetchPokemonNames = async () => {
  const pokemon = await client.get<PokemonNamesResponse>("pokemon?limit=100000&offset=0").then(res => res.data)
  return pokemon.results.map(p => ({params: {
    name: p.name
  }}))
}

const fetchTypeData = async (typeid: string) => {
  const data = await client.get<TypeData>(`type/${typeid}`).then(res => res.data)
  return data
}

export const fetchPokemonData = async (pokemonName: string) => {
  const pokemonData = await client.get<PokemonData>(`pokemon/${pokemonName}`).then((res) => res.data);
  const types = pokemonData.types;
  const typeData = await Promise.all(types.map(async t => {
    const spliturl = t.type.url.split("/")
    const typeid = spliturl[spliturl.length-2]
    const data = await fetchTypeData(typeid)
    return { data, slot: t.slot }
  }));
  return {
    pokemonData,
    typeData
  }
}
