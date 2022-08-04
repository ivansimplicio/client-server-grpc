import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:50051',
          package: 'user',
          protoPath: join(__dirname, './user.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
