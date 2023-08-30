import { Body, Controller, Post, Get, Query, Logger, Put } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';
import { PersonService } from './person.service';
import { Person } from './interfaces/person.interface';
import { UpdatePersonDto } from './dtos/update-person.dto';

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

    @Get("/getbyid")
    async getById(@Query("id") id:string):Promise<Person>
    {
        return await this._personService.getById(id);
    }

    @Put()
    async updatePerson(
        @Body() createPerson: UpdatePersonDto) {
        await this._personService.updatePerson(createPerson);
    };
    
}
