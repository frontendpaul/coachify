import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Inline style to prevent layout shift on dialog open */}
      <body style={{ marginRight: '0 !important' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
