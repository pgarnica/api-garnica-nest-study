import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { PersonSchema } from './interfaces/person.schema';

@Module({
  imports: [MongooseModule.forFeature([{name : 'Persons', schema: PersonSchema}])],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
