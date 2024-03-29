import { Body, Controller, Post, Get, Query, Logger, Put, Param, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PersonService } from './person.service';
import { UpdatePersonDto } from './dtos/update-person.dto';
import { Person } from 'src/typeorm';

@Controller('api/v1/person')
export class PersonController {

    private readonly logger = new Logger(PersonController.name)
    constructor(private readonly _personService : PersonService) {};

    @Post()
    async createPerson(
        @Body() createPerson: CreatePersonDto) {
        await this._personService.createPerson(createPerson);
    };

    @Get()
    async getAllPersons():Promise<Person[]>
    {
        return await this._personService.getAllPersons();
    }


    @Get("/:id")
    async getById(@Param("id") id:string):Promise<Person>
    {
       return await this._personService.getById(id);
    }

    @Put()
    async updatePerson(
        @Body() updatePerson: UpdatePersonDto) {
        await this._personService.updatePerson(updatePerson);
    };
    
}
