import mongoose, { Schema } from 'mongoose';
import { Document, Types } from "mongoose";
import { dbUrl } from './config';

export interface IContent extends Document {
  title: string;
  link: string;
  tags: Types.ObjectId[];
  userId: Types.ObjectId;
}


const UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

const ContentTypes = ['image', 'video', 'article', 'audio'];
const ContentSchema = new Schema({
    title:{type:String, required:true},
    type:{type:String, enum:ContentTypes, required:true},
    link:{type:String, required:true},
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User'}
});

const TagSchema = new Schema({
  title:{type:String,required:true, unique:true},
});

const LinkSchema = new Schema ({
      hash:{type:String, required:true},
      userId:{type: mongoose.Schema.ObjectId, ref:"User", required:true}
})
export const LinkModel = mongoose.model("Links", LinkSchema);
export const TagModel = mongoose.model('Tags', TagSchema);
export const ContentModel = mongoose.model<IContent>('Contents', ContentSchema);
export const UserModel = mongoose.model('User', UserSchema);


async function connectDb() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
}

connectDb();