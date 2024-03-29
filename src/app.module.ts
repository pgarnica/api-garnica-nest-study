import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema:configService.get('DB_SCHEMA'),
        migrations: ["src/migrations/*{.js}"],
        migrationsTableName: "migrations",
        entities: [join(__dirname, '**', '*.entity.{ts,js}')]
      }),
      inject: [ConfigService],
    }),
    PersonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
