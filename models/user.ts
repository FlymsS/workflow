import { User } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends User{
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  team: { type: String, required: true },
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
});

/*
const entrySchema = new Schema({
  description: { type: String, required: true },
  createAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progres", "finished"],
      message: "{VALUE} no es un estado valido",
    },
    default: "pending",
  },
});

const EntryModel: Model<User> = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;*/