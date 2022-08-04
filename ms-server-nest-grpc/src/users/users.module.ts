import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGrpcServerController } from './users-grpc-server.controller';

@Module({
  controllers: [UsersGrpcServerController],
  providers: [UsersService],
})
export class UsersModule {}
