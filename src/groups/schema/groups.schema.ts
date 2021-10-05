import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export interface Location {
  type: string;
  coordinates: number[];
}
export interface Group {
  description: string;
  location: Location;
  gymName: string;
  user: User | mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

export const LocationSchema = new mongoose.Schema<Location>(
  {
    type: String,
    coordinates: [Number],
  },
  { _id: false },
);
export const GroupSchema = new mongoose.Schema<Group>({
  description: String,
  location: LocationSchema,
  gymName: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [mongoose.Schema.Types.ObjectId],
});
