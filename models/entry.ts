import { Entry } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IEntry extends Entry{
}

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

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;