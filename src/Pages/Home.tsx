import React from "react"
import {
  Box,
  Text,
  VStack,
  Grid
} from "@chakra-ui/react"

export const HomePage = () => {

  return (
    <Box textAlign="center" fontSize="l">
      <Grid alignContent={'center'} minH="100vh" p={3}>
        <VStack>
          <Text>Welcome!</Text>
        </VStack>
      </Grid>
    </Box>
  )
}