import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from 'dotenv';
import entities from "./src/typeorm";
import { join } from "path";

config();

const configService = new ConfigService();

export const connectionSource = new DataSource( {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    schema:configService.get('DB_SCHEMA'),
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: ["src/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations",
    synchronize: true,
  });