import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePersonDto } from './dtos/update-person.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/typeorm';

@Injectable()
export class PersonService {

    private readonly logger = new Logger(PersonService.name)
    private persons : Person[] = []
    constructor(@InjectRepository(Person) private readonly personRepository: Repository<Person>) {}

    async createPerson(createPerson : CreatePersonDto):Promise<void>
    {
        await this.create(createPerson); 
    }

    async updatePerson(updatePerson : UpdatePersonDto):Promise<void>
    {
        await this.update(updatePerson); 
    }

    async getAllPersons():Promise<Person[]>{
        return await this.personRepository.find();
    }

    async getById(id:string):Promise<Person>{ 
        const person = this.personRepository.findOneBy({id:id});
        if(!person){
            throw new NotFoundException("Person not found")
        }
        return person;
    }

    private create(personDto : CreatePersonDto) :void
    {
        const newPerson = this.personRepository.create(personDto)
        this.personRepository.save(newPerson)
    }

    private async update(personDto : UpdatePersonDto) 
    {
        const updatePerson = this.personRepository.create(personDto)
        this.personRepository.save(updatePerson)
    }
}
