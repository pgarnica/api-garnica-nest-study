import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Person } from './interfaces/person.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonService {

    private readonly logger = new Logger(PersonService.name)
    private persons : Person[] = []

    async createPerson(createPerson : CreatePersonDto):Promise<void>
    {
        this.logger.log(`createPersonDto ${createPerson}`)
        await this.create(createPerson);
        
        this.persons.forEach((value : Person, index: number) => {
            this.logger.log(`person ${index} ${value.lastName}, ${value.firstName}`)
            })  
    }

    async getAllPersons():Promise<Person[]>{
        return await this.persons;
    }

    async getById(id:string):Promise<Person>{ 
        const person = await this.persons.find((person:Person) => person.lastName === id);
        if(!person){
            throw new NotFoundException("Person not found")
        }
        return person;
    }

    private create(personDto : CreatePersonDto) :void
    {
        const {firstName, lastName} = personDto

        const person : Person = {
            _id : uuidv4(),
            firstName,
            lastName
        };

        this.persons.push(person);
    }
}
