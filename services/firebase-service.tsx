import axios from 'axios';
import { Emoji, GenericObject, User } from '../models/models';
import { dateNow } from './utils';

/**
 * Retorna lista de usuários cadastrados no sistema.
 *
 * @returns Lista de usuários.
 */
export const getUsers = (): Promise<User[]> => {
  return axios
    .get(`${process.env.FIREBASE_URL}/users.json`)
    .then(res => res.data as User[]);
};

/**
 * Retorna lista de emojis utilizados no Queridômetro.
 *
 * @returns Lista de emojis.
 */
export const getEmojis = (): Promise<Emoji[]> => {
  return axios
    .get(`${process.env.FIREBASE_URL}/emojis.json`)
    .then(res => res.data as Emoji[]);
};

/**
 * Obtém todos os votos de hoje registrados no sistema.
 * @param date Data no formato dd-MM-yyyy.
 * @returns Lista de usuários e seus votos recebidos.
 */
export const getVotesFromDate = async (date: string): Promise<User[]> => {
  let users: User[] = await axios
    .get(`${process.env.FIREBASE_URL}/history/${date}.json`)
    .then(res => res?.data);

  return users ?? [];
};

export const vote = async (
  valuesFromForm: GenericObject,
  userList: User[],
): Promise<any> => {
  const date = dateNow();
  let usersToday: User[] = await getVotesFromDate(date);
  usersToday = usersToday?.length !== 0 ? usersToday : userList;

  const votosGerados: User[] = usersToday.map(user => {
    user.emojiList
      .filter(emoji => emoji.symbol === valuesFromForm[user.name])
      .forEach(emoji => (emoji.votes += 1));
    return user;
  });

  return axios.put(
    `${process.env.FIREBASE_URL}/history/${date}.json`,
    votosGerados,
  );
};
