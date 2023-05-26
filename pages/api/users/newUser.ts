import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, User } from '@/models';
import { error } from 'console';
import mongoose, { Error, Model, Mongoose } from 'mongoose';
import { userSchema, verifyUnique } from '../../../models/user';

type Data = 
  | { message: string }
  | IUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'POST':
      return postUser(req, res)
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 

const postUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {name, email, password} = req.body;

  
  const newUser = new User({ name, email, password });
  
  try{
    await db.connect();
    const a = await verifyUnique(email, name);
    if(a){
      return res.status(400).send({message: a});
    }
    await newUser.save();
    return res.status(201).json({message: 'Usuario creado correctamente'});
  }catch{
    await db.disconnect();
    console.log(error);

    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor'});
  }
}