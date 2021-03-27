import Head from 'next/head';
import React from 'react';
import {Button} from "../dummy-system";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Home() {
  const pageTitle = process.env.TITLE;
  const router = useRouter();
  
  /**
   * PÁGINA.
   */
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-sans text-center font-semibold">
          {pageTitle}
        </h1>
      </div>

      <div className='container mx-auto w-full md:max-w-lg  grid grid-cols-2 gap-2'>
        <Button primary onClick={() => {router.push('/history')}}>Ver histórico</Button>
        <Button primary onClick={() => {router.push('/vote')}}>Votar</Button>
      </div>
    </>
  );
}
