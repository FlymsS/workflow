import { User } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends User{
}

export const userSchema = new Schema({
  name: { type: String, required: true, unique:true },
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  team: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  entries: [{ type: Schema.Types.ObjectId, ref: "Entry" }],
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);

export const verifyUnique = async (email: string, name: string) => {
  return await UserModel.findOne({$or: [{email: email}, {name: name}]}).then((duplicate:IUser|null) => {
    if(duplicate){
      if(duplicate.email == email){
        return 'El correo ya esta registrado';
      }
      return 'El nombre de usuario ya esta registrado';
    }
  })
}

export const verifyUser = async (user: string, password: string)=> {
  return await UserModel.findOne({$or: [{email: user}, {name: user}]}).then((user:IUser|null) => {
    if(user){
      if(user.password == password){
        return user;
      }
      return 'La contraseña es incorrecta';
    }
    return 'El usuario no existe';
  })
}

export default UserModel;