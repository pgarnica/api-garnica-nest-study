import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from './interfaces/person.interface';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePersonDto } from './dtos/update-person.dto';

@Injectable()
export class PersonService {

    private readonly logger = new Logger(PersonService.name)
    private persons : Person[] = []
    constructor(@InjectModel('Persons') private readonly personModel: Model<Person>) {}

    async createPerson(createPerson : CreatePersonDto):Promise<void>
    {
        await this.create(createPerson); 
    }

    async updatePerson(updatePerson : UpdatePersonDto):Promise<void>
    {
        await this.update(updatePerson); 
    }

    async getAllPersons():Promise<Person[]>{
        return await this.personModel.find().exec();
    }

    async getById(id:string):Promise<Person>{ 
        const person = await this.personModel.findById(id).exec();
        if(!person){
            throw new NotFoundException("Person not found")
        }
        return person;
    }

    private create(personDto : CreatePersonDto) :void
    {
        const newPerson = new this.personModel(personDto)
        newPerson.save()
    }

    private async update(personDto : UpdatePersonDto) 
    {
        await this.personModel.findOneAndUpdate({_id: personDto._id}, {$set:personDto}).exec()
    }
}
