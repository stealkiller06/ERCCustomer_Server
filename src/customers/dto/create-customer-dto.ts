import { IsNotEmpty } from 'class-validator';
import { Address } from '../schema/customerAddress.schema';

export class CreateCustomerDto {
  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  address?: Address[];
}
