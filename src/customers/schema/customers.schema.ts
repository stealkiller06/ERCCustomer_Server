import * as mongoose from 'mongoose';
import { Address } from './customerAddress.schema';

export interface Customer {
  firstname: string;
  lastname: string;
  address: Address[] | null;
}

export const CustomerSchema = new mongoose.Schema<Customer>(
  {
    firstname: String,
    lastname: String,
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  },
  { timestamps: true },
);
