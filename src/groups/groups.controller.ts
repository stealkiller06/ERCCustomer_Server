import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateGroupDto } from './dto/create-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  create(@Body() group: CreateGroupDto, @Request() req) {
    this.groupsService.create(group, req.user.userId);
    return group;
  }

  @Get()
  findAll(@Request() req) {
    return this.groupsService.findAll(req.user.userId);
  }

  @Get('me')
  findMyGroups(@Request() req) {
    return this.groupsService.findMyGroups(req.user.userId);
  }

  @Post('join')
  joinGroup(@Request() req, @Body() body: JoinGroupDto) {
    return this.groupsService.joingGroup(req.user.userId, body.groupId);
  }
}
