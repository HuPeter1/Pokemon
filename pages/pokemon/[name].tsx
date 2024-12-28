import React, { useEffect, useState } from "react"
import Image from "next/image";
import { Container, Table } from "@nextui-org/react";
import { client } from "common/axiosClient"
import { PokemonData } from "models/pokemonData"

const PokemonPage = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData>()
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      await client.get(`pokemon/${pokemonName}`).then((res) => { setPokemonData(res.data)});
      setIsFetching(false);
    }
    void getPokemon();
  }, []);

  return (
    <Container alignContent={"center"}>
      <Container display="flex" direction="column">
        {
        !isFetching && pokemonData ?
        <>
        <Image alt={"pokemonImage"} height={200} width={200} src={pokemonData.sprites.front_default} />
        <>
          {pokemonData.name}
        </>
        <Table striped>
          <Table.Header>
            {pokemonData.abilities.map(ability=>{
              return <Table.Column key={ability.slot}>
              {
              ability.slot == 1 ? <> Ability </>
              :
              ability.slot == 2 ? <> 2nd Ability </>
              :
              <> Hidden Ability </>
              }
              </Table.Column>
            })}
          </Table.Header>
          <Table.Body>
            <Table.Row>
            {pokemonData.abilities.map(ability=>{
              return <Table.Cell key={ability.slot}> {ability.ability.name} </Table.Cell>
            })}
            </Table.Row>
          </Table.Body>
        </Table>
        </>
        :
        <>Now Loading...</>
        }
      </Container>
    </Container>
  )
}

export default PokemonPage;