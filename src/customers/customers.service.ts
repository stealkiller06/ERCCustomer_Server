import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { UpdateCustomerDto } from './dto/create-customer-dto copy';
import { Address } from './schema/customerAddress.schema';
import { Customer } from './schema/customers.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Address') private addressModel: Model<Address>,
  ) {}

  async addCustomer({
    address,
    ...customer
  }: CreateCustomerDto): Promise<Customer> {
    const customerCreated = new this.customerModel(customer);
    const customerSaved = await customerCreated.save();

    for (const addre of address) {
      const addressForm = {
        address: addre.address,
        customer: customerSaved._id,
      };
      const newAddress = new this.addressModel(addressForm);
      newAddress.save().then(() => {});
    }

    customerSaved.populate('address');
    return this.customerModel
      .findById(customerSaved._id)
      .populate('address')
      .exec();
  }
  async updateCustomer(
    { address, ...customer }: UpdateCustomerDto,
    id: string,
  ): Promise<Customer> {
    const customerToUpdate = await this.customerModel.findById(id);
    customerToUpdate.firstname = customer.firstname;
    customerToUpdate.lastname = customer.lastname;

    const customerSaved = await customerToUpdate.save();
    await this.addressModel.remove({ customer: id });
    for (const addre of address) {
      const addressForm = {
        address: addre.address,
        customer: customerSaved._id,
      };
      const newAddress = new this.addressModel(addressForm);
      newAddress.save().then(() => {});
    }

    return this.customerModel
      .findById(customerSaved._id)
      .populate('address')
      .exec();
  }

  async getCustomer(): Promise<Customer[]> {
    const customers = this.customerModel
      .aggregate([
        {
          $lookup: {
            from: 'addresses',
            localField: '_id',
            foreignField: 'customer',
            as: 'address',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
      .exec();
    return customers;
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.addressModel.deleteMany({ customer: id });
    await this.customerModel.deleteOne({ _id: id });
  }
}
