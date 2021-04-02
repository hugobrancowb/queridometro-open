import axios from 'axios';
import { Emoji, User, VotesByDate } from '../models/models';

/**
 * Retorna lista de usuários cadastrados no sistema.
 *
 * @returns Lista de usuários.
 */
export const getUsers = (): Promise<User[]> => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/users.json`)
    .then(res => res.data as User[]);
};

/**
 * Retorna lista de emojis utilizados no Queridômetro.
 *
 * @returns Lista de emojis.
 */
export const getEmojis = (): Promise<Emoji[]> => {
  return axios
    .get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/emojis.json`)
    .then(res => res.data as Emoji[]);
};

/**
 * Obtém todos os votos de hoje registrados no sistema.
 * @param date Data no formato dd-MM-yyyy.
 * @returns Lista de usuários e seus votos recebidos.
 */
export const getVotesFromDate = async (date: string): Promise<User[]> => {
  let users: User[] = await axios
    .get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/history/${date}.json`)
    .then(res => res?.data);

  return users ?? [];
};

/**
 * Obtém todos os votos realizados.
 * @returns Lista de usuários e seus votos recebidos, organizados por data.
 */
export const getAllVotes = async (): Promise<VotesByDate[]> => {
  let votes: VotesByDate[] = await axios
    .get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/history.json`)
    .then(res => res?.data);

  return votes ?? [];
};
