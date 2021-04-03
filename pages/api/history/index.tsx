import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { method } = req;
  if (method === 'GET') {
    return getHistory(req, res);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${method} not allowed.`);
  return res;
};

/**
 * Obtém todo o histórico de votos.
 * @param req
 * @param res
 */
export const getHistory = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  return axios
    .get(`${process.env.FIREBASE_URL}/history.json`)
    .then(response => {
      const votes = response?.data ?? [];
      res.status(200).json(votes);
      return res;
    })
    .catch(() => {
      res.status(400).end();
      return res;
    });
};
