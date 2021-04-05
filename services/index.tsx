import { fetcher, orderDates } from '@utils';
import React from 'react';
import useSWR from 'swr';
import { Emoji, User } from '@models';

/**
 * Retorna todos usuários cadastrados para o Queridômetro.
 *
 * @param emojis Lista de emojis utilizada para construção dos usuários.
 * @returns data Lista de usuários.
 * @returns loading Estado de loading.
 * @returns error Objeto de erro.
 */
export function useGetUsers(emojis: Emoji[]) {
  let users: User[];
  const { data: _users, error } = useSWR(
    () => {
      return emojis
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/data/users`
        : null;
    },
    fetcher,
    { revalidateOnFocus: false },
  );

  if (_users && emojis) {
    emojis.forEach(emoji => (emoji.votes = 0));
    _users.forEach(user => {
      user.emojiList = emojis;
    });

    users = _users;
  }

  const loading: boolean = !users && !error;
  return { users, loading, error };
}

/**
 * Retorna todos emojis cadastrados para o Queridômetro.
 *
 * @returns data Lista de emojis.
 * @returns loading Estado de loading.
 * @returns error Objeto de erro.
 */
export function useGetEmojis() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/data/emojis`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );
  const emojis: Emoji[] = data;

  const loading: boolean = !emojis && !error;
  return { emojis, loading, error };
}

/**
 * Retorna todas as datas em que o Queridômetro possui votos.
 *
 * @returns data Lista de datas.
 * @returns loading Estado de loading.
 * @returns error Objeto de erro.
 */
export function useGetHistory() {
  let dates: any[];
  const { data: votes, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/history`,
    fetcher,
  );

  if (votes) dates = orderDates(Object.keys(votes));

  const loading: boolean = !votes && !error;
  return {
    data: {
      votes,
      dates,
    },
    loading,
    error,
  };
}

/**
 * Retorna todos votos de uma data.
 *
 * @returns data Todos votos de uma data.
 * @returns loading Estado de loading.
 * @returns error Objeto de erro.
 */
export function useGetVotesFromDate(date: string) {
  const { data, error } = useSWR(
    () =>
      date && date !== '-1'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/${date}`
        : null,
    fetcher,
  );

  const loading = !data && !error;
  return { data, loading, error };
}
