import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, Team, User } from '@/models';
import { error } from 'console';

type Data = 
  | { message: string }
  | IUser[]
  | IUser



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const idUser = req.cookies.idUser;
  const idTeam = req.cookies.idTeam;
  switch( req.method ) {
    case 'POST':
      return postEntry(res, idUser!, idTeam!);
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 

const postEntry = async (res: NextApiResponse<Data>, idUser: string, idTeam: string) => {
  const newTeam = await Team.findById(idTeam);
  if(!newTeam){
    return res.status(400).json({message: "No existe el equipo"});
  }
  const user = await User.findById(idUser);
  if(!user){
    return res.status(400).json({message: "No existe el usuario"});
  }
  if(newTeam.admins.includes(user)){
    return res.status(409).json({message: "El usuario ya es admin "});
  }
  newTeam.admins.push(user);
  try{
    await db.connect();
    await newTeam.save();
    await db.disconnect();
    res.status(201).json({message: "Usuario agregado al equipo"});
  }catch{
    await db.disconnect();
    console.log(error);
    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor'});
  }
}