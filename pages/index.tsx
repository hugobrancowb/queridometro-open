import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import SelectUser from '../components/selectUser/selectUser';
import {Button} from "../dummy-system";
import Link from "next/link";

export default function Home() {
  
  const pageTitle = 'Queridômetro Justa';
  
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
        <Link href='/history'><Button primary >Ver histórico</Button></Link>
        <Link href='/vote'><Button primary >Votar</Button></Link>
      </div>
    </>
  );
}
