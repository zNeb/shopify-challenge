import { SkipNavContent, SkipNavLink } from '@reach/skip-nav';
import Progress from 'components/Progress';
import Head from 'next/head';
import type { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import '@reach/skip-nav/styles.css';

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        {/* Old browsers only support ico */}
        {/* eslint-disable-next-line react/no-invalid-html-attribute */}
        <link rel="shortcut icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </Head>
      <SkipNavLink />
      <Header />
      <SkipNavContent />
      {children}
      <Footer />
      <Progress />
    </>
  );
}
