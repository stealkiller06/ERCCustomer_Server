import * as mongoose from 'mongoose';

export const ModelName = 'User';

export class User {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
export const UserSchema = new mongoose.Schema<User>({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
});
