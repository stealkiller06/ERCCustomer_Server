import * as mongoose from 'mongoose';

export interface Address {
  address: string;
  customer: mongoose.Types.ObjectId;
}

export const AddressSchema = new mongoose.Schema<Address>({
  address: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
});
