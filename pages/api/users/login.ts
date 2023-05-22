import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, User } from '@/models';
import { verifyUser } from '@/models/user';

type Data = 
  | { message: string }
  | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'POST':
      return postLogin(req, res)
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 

const postLogin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { user, password } = req.body;
  try{
    db.connect();
    const a = await verifyUser(user, password);
    if(typeof a == 'string'){
      return res.status(400).send({message: a});
    }
    return res.status(201).send({id: a._id});
  }catch{
    await db.disconnect();
    console.log(error);

    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor'});
  }
}