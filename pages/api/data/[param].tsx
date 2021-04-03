import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { method } = req;
  if (method === 'GET') {
    return redirectRoute(req, res);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${method} not allowed.`);
  return res;
};

const redirectRoute = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { param } = req.query;

  switch (param) {
    case 'users':
      return getUsers(req, res);
    case 'emojis':
      return getEmojis(req, res);
    default:
      res.status(404).end('Rota inexistente.');
  }

  return res;
};

/**
 * Requisição para lista de participantes do Queridômetro.
 *
 * @param req
 * @param res Lista de participantes.
 */
const getUsers = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  return axios
    .get(`${process.env.FIREBASE_URL}/users.json`)
    .then(response => {
      res.status(200).json(response.data);
      return res;
    })
    .catch(err => {
      res.status(500).end();
      return res;
    });
};

/**
 * Requisição para lista de emojis/reações do Queridômetro.
 *
 * @param req
 * @param res Lista de emojis/reações.
 */
const getEmojis = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  return axios
    .get(`${process.env.FIREBASE_URL}/emojis.json`)
    .then(response => {
      res.status(200).json(response.data);
      return res;
    })
    .catch(err => {
      res.status(500).end();
      return res;
    });
};
