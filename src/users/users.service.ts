import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    const userFound = await this.userModel.findOne({ email }).exec();
    return userFound;
  }

  async create(user: User): Promise<User> {
    await this.checkIfUserExist(user.email);
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hash;
    const userCreated = new this.userModel(user);
    return userCreated.save();
  }

  private async checkIfUserExist(email: string) {
    const emailExist = await this.userModel.count({ email }).exec();
    if (emailExist)
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
  }
}
