import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = 
| {message: string}
| IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { entryId } = req.query;
  const idUser = req.cookies.idUser;
  if (!mongoose.isValidObjectId(entryId)) {
    return res.status(400).json({ message: "El ID no es valido " });
  }
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res, idUser!);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Método no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { entryId } = req.query;
  await db.connect();
  const entryById = await Entry.findById(entryId);
  await db.disconnect();

  if (!entryById) {
    return res.status(400).json({ message: "No existe el ID" });
  }
  return res.status(200).json(entryById);
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { entryId } = req.query;
  try{
    await db.connect();
    const entryToDelete = await Entry.findById(entryId);
    if(!entryToDelete){
      return res.status(400).json({message: 'No existe el ID'});
    }
    await entryToDelete.deleteOne();
    await db.disconnect();
    return res.status(200).json({message: 'Entry deleted'});
  }catch(error){
    return res.status(400).json({message: 'bad request'});
  }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>, idUser:string) => {
  const { entryId } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(entryId);
  await db.disconnect();

  if (!entryToUpdate) {
    return res.status(400).json({ message: "No existe el ID" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try{
    let updatedEntry;
    if(status === 'finished'){
      updatedEntry = await Entry.findByIdAndUpdate(entryId, {
        description,
        status,
      }, {runValidators: true, new: true});
    }else{
      updatedEntry = await Entry.findByIdAndUpdate(entryId, {
        description,
        status,
      }, {runValidators: true, new: true});
    }
    res.status(200).json(updatedEntry!);
  }catch(error){
    await db.disconnect();
    res.status(400).json({message: 'bad request'});
  }

};
