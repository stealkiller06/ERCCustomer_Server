import { IsNotEmpty } from 'class-validator';
import { Address } from '../schema/customerAddress.schema';

export class UpdateCustomerDto {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  address?: Address[];
}
