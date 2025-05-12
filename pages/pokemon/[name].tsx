import { Container, Table } from "@nextui/react"
import { fetchPokemonData, fetchPokemonNames } from "common/pokemonNames"
import type { PokemonData } from "models/pokemonData"
import { TypeData } from "models/typeData"
import Head from "next/head"
import Image from "next/image"
import React from "react"
import styles from "styles/Home.module.css"

interface Props {
  pokemonData: PokemonData;
  typeData: {
    data: TypeData;
    slot: number;
  }[]
}

const PokemonPage = ({ pokemonData, typeData }: Props) => {
  const renderPokemonName = () => {
    const name = pokemonData.name.toUpperCase();
    const splitName = name.split("-");
    let newName: string
    if (splitName.length >= 2) {
      if (splitName[1] == "MEGA") {
        splitName[1] = splitName[0];
        splitName[0] = "MEGA"
        newName = splitName.join(" ");
      }
      else { newName = name; }
    }
    else { newName = name; }
    return newName;
  }

  let newName: any
  newName = renderPokemonName()

  return (
    <div className={styles.container}>
      <Head>
        <title>{newName}</title>
        <link rel="icon" href="/Pokeball.ico" />
      </Head>
      <main className={styles.main}>
        <Container
          display="flex"
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <Container
            display="flex"
            direction="column"
            alignContent="center"
            alignItems="center"
          >
            <Image
              alt={"pokemonImage"}
              height={250}
              width={250}
              src={pokemonData.sprites.front_default}
            />
            <h1>{newName}</h1>
            {typeData.map(type =>
              <Image
                style={{ margin: "8px" }}
                key={type.slot}
                alt={type.data.name}
                height={30}
                width={150}
                src={type.data.sprites["generation-ix"]["scarlet-violet"].name_icon}
              />
            )}
          </Container>
          <div style={{ width: "50%" }}>
            <Table striped aria-label="Abilities Table">
              <Table.Header>
                {pokemonData.abilities.map((ability) => {
                  return (
                    <Table.Column key={ability.slot}>
                      {ability.slot == 1 ? (
                        <> Ability </>
                      ) : ability.slot == 2 ? (
                        <> 2nd Ability </>
                      ) : (
                        <> Hidden Ability </>
                      )}
                    </Table.Column>
                  )
                })}
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  {pokemonData.abilities.map((ability) => {
                    return (
                      <Table.Cell key={ability.slot}>
                        {ability.ability.name}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Container>
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = await fetchPokemonNames()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  const { pokemonData, typeData } = await fetchPokemonData(params.name)
  return {
    props: {
      pokemonData,
      typeData,
    },
  }
}

export default PokemonPage
