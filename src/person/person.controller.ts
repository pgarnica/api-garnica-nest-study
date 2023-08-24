import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonDto } from './dtos/create-person.dto';

@Controller('api/v1/person')
export class PersonController {

    @Post()
    async createUpdatePerson(
        @Body() createPerson : CreatePersonDto
        )
    {
        const {firstName, lastName} = createPerson
        return "new Name is " + firstName + " " + lastName;
    };
}
