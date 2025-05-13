import { Container, Link } from "@nextui-org/react"
import Head from "next/head"
import Image from "next/image"
import styles from "styles/Home.module.css"

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
        <Link href="/pokemon/terapagos-stellar" underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
          TERAPAGOS-STELLAR
        </Link>
        <Link href="/pokemon/bulbasaur" underline="true" style={{ fontSize: "24px", fontWeight: "bold" }}>
          BULBASAUR
        </Link>
      </Container>
      <div className={styles.container}>
        <Head>
          <title>HOME</title>
          <link rel="icon" href="/Pokeball.ico" />
        </Head>
        <main className={styles.main}>
          <h1>
            <Image src="/Pokeball.ico" alt="Pokeball" width={256} height={256} />
          </h1>
          <h1 className={styles.title}>
            Pokémon Encyclopedia
          </h1>
        </main>
      </div>
    </Container>
  )
}
