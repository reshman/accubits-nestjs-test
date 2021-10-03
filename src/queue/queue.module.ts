import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { Logs } from './logs.entity';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs]), EmailModule],
  controllers: [QueueController],
  providers: [
    {
      provide: 'EMAIL_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: configService.get('RMQ_URL'),
            queue: 'email_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'PARKING_LOT_QUEUE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: configService.get('RMQ_URL'),
            queue: 'parking_lot_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    QueueService,
  ],
})
export class QueueModule {}
