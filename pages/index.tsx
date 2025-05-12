import { Container, Link } from "@nextui/react"
import { fetchPokemonData, fetchPokemonNames } from "common/pokemonNames"
import type { PokemonData } from "models/pokemonData"
import dynamic from "next/dynamic"
import Head from "next/head"
import Image from "next/image"

import styles from "styles/Home.module.css"

const CustomCheckbox = dynamic(() => import("../components/Checkbox"))
const CustomTable = dynamic(() => import("../components/Table"))
const CustomCollapse = dynamic(() => import("../components/Collapse"))

export default function Home() {
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
        <Link href="/pokemon/pecharunt" underline="true">Pecharunt</Link>
        <Link href="/pokemon/bulbasaur" underline="true">Bulbasaur</Link>
      </Container>
      <div className={styles.container}>
        <Head>
          <title>HOME</title>
          <link rel="icon" href="/Pokeball.ico" />
        </Head>
        <main className={styles.main}>
          <h1>
            <Image src="/Pokeball.ico" alt="Pokeball" width={64} height={64} />
          </h1>
          <h1 className={styles.title}>
            Pokémon Encyclopedia
          </h1>
        </main>
      </div>
    </Container>
  )
}
