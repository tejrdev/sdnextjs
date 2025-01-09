import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Head from 'next/head';
//for state management
import { Providers } from '../../redux/provider';

export default function LayoutWithSidebar({ children, data }) {
  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <Providers>{children}</Providers>
    </>
  );
}
