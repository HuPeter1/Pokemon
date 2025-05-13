import "../styles/globals.css"

import { NextUIProvider } from "@nextui-org/react"
import type { AppProps } from "next/app"
import { Analytics } from '@vercel/analytics/next';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
      <Analytics />
    </NextUIProvider>
  )
}
