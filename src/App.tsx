import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {
  ChakraProvider,
  defaultSystem
} from "@chakra-ui/react"
import { HomePage } from "Pages/Home";
import { PokemonPage } from "Pages/Pokemon";

export const App = () => (
  <ChakraProvider value={defaultSystem}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:pokemonName" element={<PokemonPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
)
