import { NextApiRequest, NextApiResponse } from 'next';
import { GenericObject, User } from '@models';
import axios from 'axios';
import { dateNow } from '@utils';
import { mutate } from 'swr';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { method } = req;
  if (method === 'POST') return postVote(req, res);

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${method} not allowed.`);
  return res;
};

/**
 * Computa soma de votos e sobe o total para o banco.
 *
 * @param req
 * @param res
 */
export const postVote = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const userList: User[] = req.body?.userList;
  const valuesFromForm: GenericObject = req.body?.valuesFromForm;

  // Confere senha
  if (valuesFromForm.password !== process.env.PASSPHRASE) {
    res.status(401).send({
      ok: false,
      message: 'Senha inválida',
      error: { password: 'Senha inválida' },
    });
    return res;
  }

  const date = dateNow();
  const urlToday = `${process.env.NEXT_PUBLIC_BASE_URL}/api/history/${date}`;
  let votesFromToday: User[] = await axios.get(urlToday).then(res => res?.data);

  votesFromToday = votesFromToday?.length !== 0 ? votesFromToday : userList;

  const votosGerados: User[] = votesFromToday.map(user => {
    user.emojiList
      .filter(emoji => emoji.symbol === valuesFromForm[user.name])
      .forEach(emoji => (emoji.votes += 1));
    return user;
  });

  return axios
    .put(`${process.env.FIREBASE_URL}/history/${date}.json`, votosGerados)
    .then(() => {
      mutate(urlToday);
      res.status(201).json({ url: `/history/${date}` });
      return res;
    })
    .catch(error => {
      res.status(400).end();
      return res;
    });
};
