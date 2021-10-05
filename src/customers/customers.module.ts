import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerSchema } from './schema/customers.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersController } from './customers.controller';
import { AddressSchema, Address } from './schema/customerAddress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [MongooseModule],
})
export class CustomersModule {}
