import { db } from '@/database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { IUser, Team } from '@/models';
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
    case 'DELETE':
      return deleteEntry(res, idUser!, idTeam!);
    default:
      return res.status(400).json({ message : 'EndPoint no existe' })
  }
} 

const deleteEntry = async (res: NextApiResponse<Data>, idUser: string, idTeam: string) => {
  const newTeam = await Team.findById(idTeam);
  if(!newTeam){
    return res.status(400).json({message: "No existe el equipo"});
  }
  if(!newTeam.users.includes(idUser)){
    return res.status(409).json({message: "El usuario no esta en el equipo"});
  }
  newTeam.users = newTeam.users.filter((user) => user.toString() != idUser);
  try{
    await db.connect();
    await newTeam.save();
    await db.disconnect();
    res.status(201).json({message: "Usuario eliminado del equipo"});
  }catch{
    await db.disconnect();
    console.log(error);
    return res.status(500).json({message: 'Algo salio mal, revisar consola del servidor'});
  }
}

const postEntry = async (res: NextApiResponse<Data>, idUser: string, idTeam: string) => {
  const newTeam = await Team.findById(idTeam);
  if(!newTeam){
    return res.status(400).json({message: "No existe el equipo"});
  }
  if(newTeam.users.includes(idUser)){
    return res.status(409).json({message: "El usuario ya esta en el equipo"});
  }
  newTeam.users.push(idUser);
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