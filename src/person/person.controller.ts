import { Controller, Post } from '@nestjs/common';

@Controller('api/v1/person')
export class PersonController {

    @Post()
    async createUpdatePerson()
    {
        return JSON.stringify("Paulo Garnica")
    };
}
