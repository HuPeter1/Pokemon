import React, { useEffect, useState } from "react"
import {
  Box,
  Text,
  VStack,
  Grid,
  Image,
  Table,
  Flex
} from "@chakra-ui/react"
import { client } from 'axiosClient'
import { PokemonData } from "Models/pokemonData"
import { useParams } from "react-router-dom"

export const PokemonPage = () => {

  const params = useParams();
  const pokemonName = params.pokemonName;
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
    <Box textAlign={"center"} fontSize="xl">
      <Grid alignContent={"center"} minH="100vh" p={3}>
        <VStack>
          {
          !isFetching && pokemonData ?
          <>
          <Image height={"200px"} width={"200px"} src={pokemonData.sprites.front_default} />
          <Text>
            {pokemonData.name}
          </Text>
          <Flex alignSelf={"flex-end"} width={pokemonData.abilities.length * 200}>
            <Table.Root size={"md"} striped showColumnBorder>
              <Table.Header>
                <Table.Row>
                {pokemonData.abilities.map(ability=>{
                  return <Table.ColumnHeader key={ability.slot}>
                  {
                  ability.slot == 1 ? <Text> Ability </Text>
                  :
                  ability.slot == 2 ? <Text> 2nd Ability </Text>
                  :
                  <Text> Hidden Ability </Text>
                  }
                  </Table.ColumnHeader>
                })}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                {pokemonData.abilities.map(ability=>{
                  return <Table.Cell key={ability.slot}> {ability.ability.name} </Table.Cell>
                })}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Flex>
          </>
          :
          <Text>Now Loading...</Text>
          }
        </VStack>
      </Grid>
    </Box>
  )
}
