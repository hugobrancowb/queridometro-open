import { fetcher } from '../utils';
import React from 'react';
import useSWR from "swr";

export function useGetVotesFromDate(date: string) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/${date}`,
    fetcher,
  );
  const loading = !data && !error;
  return { data, loading, error };
}
