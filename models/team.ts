import { Team } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface ITeam extends Team{
}

const teamSchema = new Schema({
  name: { type: String, required: true, unique:true },
  description: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
});

const UserModel: Model<ITeam> = mongoose.models.User || mongoose.model("Team", teamSchema);

export default UserModel;