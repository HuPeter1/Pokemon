import { CssBaseline } from "@nextui-org/react"
import type { DocumentContext, DocumentInitialProps } from "next/document"
import Document, { Head, Html, Main, NextScript } from "next/document"
import { Children } from "react"

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
