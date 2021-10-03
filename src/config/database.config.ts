import { registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModule => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }),
);
