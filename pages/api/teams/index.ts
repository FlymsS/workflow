import { db } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";
import { ITeam, Team, User } from "@/models";
import { error } from "console";

type Data = {  message: string } | ITeam[] | ITeam;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const idUser = req.cookies.idUser;
  switch (req.method) {
    case "GET":
      return getTeams(res, idUser!);
    case "POST":
      return postTeam(req, res, idUser!);
    case "PUT":
      return putTeam(req, res);
    case "DELETE":
      return deleteTeam(req, res);
    default:
      return res.status(400).json({ message: "EndPoint no existe" });
  }
}

const deleteTeam = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const idTeam = req.cookies.idTeam;
  console.log(idTeam);
  await db.connect();
  try{
    await Team.deleteOne({_id: idTeam});
    await db.disconnect();
    return res.status(201).json({message: "Equipo eliminado"});
  }catch{
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
}

const putTeam = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const idTeam = req.cookies.idTeam;
  const { description = "", name="" } = req.body;
  await db.connect();
  try{
    const team = await Team.findById(idTeam);
    if(!team){
      return res.status(400).json({message: "No existe el equipo"});
    }
    team.description = description;
    team.name = name;
    await team.save();
    await db.disconnect();
    return res.status(201).json(team);
  }catch{
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
};

const getTeams = async (res: NextApiResponse<Data>, idUser: string) => {
  await db.connect();
  const teams = await Team.find({ users: idUser }).sort({
    createAt: "ascending",
  });
  await db.disconnect();
  res.status(200).json(teams);
};

const postTeam = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  idUser: string,
) => {
  const { description = "", name="" } = req.body;
  
  try {
    await db.connect();
    const user = await User.findById(idUser);
    const newTeam = new Team({
      admins: [user],
      users: [user],
      description: description,
      entries: [],
      name: name
    });
    console.log("before save", newTeam, user);
    await newTeam.save();
    await db.disconnect();
    res.status(201).json(newTeam);
  } catch (error){
    await db.disconnect();
    return res
      .status(500)
      .json({ message: "Algo salio mal, revisar consola del servidor" });
  }
};
