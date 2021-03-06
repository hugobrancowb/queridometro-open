import axios from "axios";
import { User } from '../models/models'

const FIREBASE_URL = 'https://queridometro-justa-default-rtdb.firebaseio.com';

/**
 * Retorna lista de usuários cadastrados no sistema.
 *
 * @returns Lista de usuários.
 */
export const GETUsers = (): Promise<User[]> => {
  return axios.get(`${FIREBASE_URL}/users.json`)
      .then(res => res.data)
}
