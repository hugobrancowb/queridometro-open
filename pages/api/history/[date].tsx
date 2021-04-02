import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidDate } from '../../../utils';
import axios from 'axios';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { method } = req;
  if (method === 'GET') {
    return getHistoryFromDate(req, res);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${method} not allowed.`);
  return res;
};

export const getHistoryFromDate = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<NextApiResponse> => {
  const { date } = req.query;

  if (!isValidDate(date)) {
    res.status(400).end(`Formato inválido`);
  } else {
  
    const body = await axios
      .get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/history/${date}.json`)
      .then(_res => _res?.data ?? []);

    res.status(200).json(body);
  }
  return res;
};
