import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Person } from '../../src/typeorm';

function getRandomBirthDate(): Date {
  // Set a range for birth dates, e.g., from 1970 to 2000
  const startYear = 1970;
  const endYear = 2000;

  const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity

  return new Date(randomYear, randomMonth - 1, randomDay);
}

const persons: Person[] = [
  { id: 'e689ed35-9f8a-42a6-b0c1-7002aa69bb06', name: 'John Doe', email: 'john@example.com', birthDate: getRandomBirthDate(), documentNumber: '10', phone: '10' },
  { id: 'cc3a22d1-6505-4eaa-91f6-5f0d59db86cd', name: 'Jane Doe', email: 'jane@example.com', birthDate: getRandomBirthDate(), documentNumber: '11', phone: '11' },
];

describe('PersonService', () => {
  let service: PersonService;
  let repository: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    repository = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  describe('createPerson', () => {
    it('should create a person', async () => {
      //Arrange
      const createPersonDto: CreatePersonDto = { name: 'John Doe', email: 'john@example.com',birthDate: getRandomBirthDate(), documentNumber: '10', phone: '10'  };

      const person = new Person();
      person.name = createPersonDto.name;
      person.email = createPersonDto.email;

      jest.spyOn(repository, 'create').mockReturnValueOnce(person);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(person);

      //Act
      await service.createPerson(createPersonDto);

      //Assert
      expect(repository.create).toHaveBeenCalledWith(createPersonDto);
      expect(repository.save).toHaveBeenCalledWith(person);
    });
  });

  describe('updatePerson', () => {
    it('should update a person', async () => {
      //Arrange
      const updatePersonDto: UpdatePersonDto =
      {
        id: 'e689ed35-9f8a-42a6-b0c1-7002aa69bb06',
        name: 'Updated Name',
        email: 'updated@example.com',birthDate: getRandomBirthDate(), documentNumber: '10', phone: '10' 
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(persons[0]);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(undefined);

      //Act
      await service.updatePerson(updatePersonDto);

      //Assert
      expect(repository.update).toHaveBeenCalledWith(updatePersonDto.id, updatePersonDto);
    });

    it('should throw NotFoundException if person to update is not found', async () => {
      // Arrange
      const updatePersonDto: UpdatePersonDto = {
        id: 'e689ed35-9f8a-42a6-b0c1-7002aa69bb07',
        name: 'Updated Name',
        email: 'updated@example.com',
        birthDate: getRandomBirthDate(), documentNumber: '10', phone: '10' 
      };
  
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);
  
      // Act & Assert
      await expect(service.updatePerson(updatePersonDto)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getAllPersons', () => {
    it('should get all persons', async () => {
      // Arrange
      jest.spyOn(repository, 'find').mockResolvedValueOnce(persons);
  
      // Act
      const result = await service.getAllPersons();
  
      // Assert
      expect(result).toEqual(persons);
    });
  });
  
  describe('getById', () => {
    it('should get a person by id', async () => {
      // Arrange
      const id = 'e689ed35-9f8a-42a6-b0c1-7002aa69bb06';
      
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(persons[0]);
  
      // Act
      const result = await service.getById(id);
  
      // Assert
      expect(result).toEqual(persons[0]);
    });
  
    it('should throw NotFoundException if person not found', async () => {
      // Arrange
      const id = 'cc3a22d1-6505-4eaa-91f6-5f0d59db86cd';
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(undefined);
  
      // Act & Assert
      await expect(service.getById(id)).rejects.toThrowError(NotFoundException);
    });
  });
});