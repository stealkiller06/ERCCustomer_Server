import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './schema/groups.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel('Group') private groupModel: Model<Group>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(group: CreateGroupDto, userId: string) {
    const location = {
      type: 'Point',
      coordinates: [group.latitude, group.longitude],
    };
    const groupCreated = new this.groupModel({
      ...group,
      location,
      user: new mongoose.Types.ObjectId(userId),
    });
    return groupCreated.save();
  }

  async findAll(userId: string): Promise<Group[]> {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    return this.groupModel.find({ members: { $ne: userObjectId } }).exec();
  }

  async findMyGroups(userId: string): Promise<Group[]> {
    return this.groupModel
      .find({
        user: new mongoose.Types.ObjectId(userId),
      })
      .populate('user')
      .exec();
  }

  async joingGroup(userId: string, groupId: string) {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const group = await this.groupModel.findOne(
      new mongoose.Types.ObjectId(groupId),
    );
    if (!group) {
      throw new HttpException("This group doesn't exist", HttpStatus.NOT_FOUND);
    }

    const isGroupOwner = group.user.toString() == userObjectId.toString();

    if (isGroupOwner) {
      throw new HttpException(
        'You are the owner of this group',
        HttpStatus.CONFLICT,
      );
    }

    const userExist = group.members.find(
      (memberId) => memberId.toString() == userId,
    );
    if (userExist)
      throw new HttpException('You belong to this group', HttpStatus.CONFLICT);

    if (group.members) {
      group.members = [...group.members, userObjectId];
    } else {
      group.members = [userObjectId];
    }
    group.save();

    return group;
  }
}
