import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEntry, Entry, User } from '@/models';
import { error } from 'console';

type Data = 
  | { message: string }
  | IEntry[]
  | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const idUser = req.cookies.idUser;
  switch( req.method ) {
    case 'GET':
      return  getEntries(res, idUser!);
    case 'POST':
      return postEntry(req, res, idUser!);
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 


const getEntries = async (res: NextApiResponse<Data>, idUser: string) => {
  await db.connect();
  const entries = await Entry.find({createdBy:idUser}).sort({ createAt: 'ascending' });
  await db.disconnect();
  res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, idUser: string) => {
  const {description = ''} = req.body;
  const newEntry = new Entry({
    description,
    createAt: new Date().getTime(),
    createdBy: idUser,
  });

  try{
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    res.status(201).json(newEntry);
  }catch{
    await db.disconnect();
    console.log(error);
    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor'});
  }
}