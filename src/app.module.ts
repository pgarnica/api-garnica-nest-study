import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/api-garnica-nest-study'),
    PersonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
