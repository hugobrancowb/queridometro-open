import axios from 'axios';
import { Emoji, User } from '../models/models';

const FIREBASE_URL = 'https://queridometro-justa-default-rtdb.firebaseio.com';

/**
 * Retorna lista de usuários cadastrados no sistema.
 *
 * @returns Lista de usuários.
 */
export const GETUsers = (): Promise<User[]> => {
  return axios.get(`${FIREBASE_URL}/users.json`).then(res => res.data as User[]);
};

/**
 * Retorna lista de emojis utilizados no Queridômetro.
 *
 * @returns Lista de emojis.
 */
export const GETEmojis = (): Promise<Emoji[]> => {
  return axios
    .get(`${FIREBASE_URL}/emojis.json`)
    .then(res => res.data as Emoji[]);
};
