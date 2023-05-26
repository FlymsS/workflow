import { Team } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface ITeam extends Team{
}

const teamSchema = new Schema({
  name: { type: String, required: true, unique:true },
  description: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
});

const UserModel: Model<ITeam> = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default UserModel;