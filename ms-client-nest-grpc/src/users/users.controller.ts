import { UserServiceGRPC } from './interfaces/user-service-grpc';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController implements OnModuleInit {
  private userServiceGRPC: UserServiceGRPC;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userServiceGRPC =
      this.client.getService<UserServiceGRPC>('UserService');
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return lastValueFrom(this.userServiceGRPC.create(data));
  }

  @Get()
  async findAll() {
    return lastValueFrom(this.userServiceGRPC.findAll({}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.userServiceGRPC.findOne({ id }));
    } catch (error) {
      throw new NotFoundException(error.details);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    try {
      return await lastValueFrom(this.userServiceGRPC.update({ id, ...data }));
    } catch (error) {
      throw new NotFoundException(error.details);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await lastValueFrom(this.userServiceGRPC.delete({ id }));
    } catch (error) {
      throw new NotFoundException(error.details);
    }
  }
}
