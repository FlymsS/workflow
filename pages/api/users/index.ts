import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, User } from '@/models';

type Data = 
  | { message: string }
  | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'GET':
      return getUser(req, res)
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 

const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const idUser = req.query.idUser;
  await db.connect()
  const newUser = await User.findById(idUser);
  await db.disconnect();
  if (!newUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.status(200).send(newUser)

}