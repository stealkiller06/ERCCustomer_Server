import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { UpdateCustomerDto } from './dto/create-customer-dto copy';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  async getCustomer() {
    return this.customersService.getCustomer();
  }
  @Post()
  async addCustomer(@Body() customer: CreateCustomerDto) {
    const customerCreated = this.customersService.addCustomer(customer);
    return customerCreated;
  }

  @Patch(':id')
  async updateCustomer(
    @Body() customer: UpdateCustomerDto,
    @Param('id') id: string,
  ) {
    const customerCreated = this.customersService.updateCustomer(customer, id);
    return customerCreated;
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return this.customersService.deleteCustomer(id);
  }
}
