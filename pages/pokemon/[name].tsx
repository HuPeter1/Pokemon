import { Container, Table, Link } from "@nextui-org/react"
import { fetchPokemonData, fetchPokemonNames, formatPokemonName } from "common/pokemonNames"
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
  prevPage: string | null;
  nextPage: string | null;
}

const PokemonPage = ({ pokemonData, typeData, prevPage, nextPage }: Props) => {
  let currPokemon: string | null;
  currPokemon = formatPokemonName(pokemonData.name);

  return (
    <Container
      display="flex"
    >
      <Container
        display="flex"
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {prevPage === "HOME" ? (
          <Link href="/" underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
            HOME
          </Link>
        ) : (
          <Link href={`/pokemon/${prevPage}`} underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatPokemonName(prevPage)}
          </Link>
        )}

        {nextPage === "HOME" ? (
          <Link href="/" underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
            HOME
          </Link>
        ) : (
          <Link href={`/pokemon/${nextPage}`} underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatPokemonName(nextPage)}
          </Link>
        )}
      </Container>
      <div className={styles.container}>
        <Head>
          <title>{currPokemon}</title>
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
              {pokemonData.sprites.front_default && (
                <Image
                  alt="pokemonImage"
                  height={250}
                  width={250}
                  src={pokemonData.sprites.front_default}
                />
              )}
              <h1 style={{ textAlign: "center" }}>{currPokemon}</h1>
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
    </Container>
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
  const allPokemonNames = await fetchPokemonNames()
  const currentIndex = allPokemonNames.findIndex(
    (poke) => poke.params.name === params.name)
  const lastIndex = allPokemonNames.length - 1;
  const prevPage = currentIndex > 0 ?
    allPokemonNames[currentIndex - 1].params.name
    :
    "HOME";
  const nextPage = currentIndex < lastIndex ?
    allPokemonNames[currentIndex + 1].params.name
    :
    "HOME";
  return {
    props: {
      pokemonData,
      typeData,
      prevPage,
      nextPage,
    },
  }
}

export default PokemonPage
