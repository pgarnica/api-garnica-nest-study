import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        default: '',
      })
      name: string;

      @Column({
        nullable: false,
        default: '',
      })
      email: string;

      @Column({
        nullable: false,
        default: '',
      })
      phone: string;

      @Column({
        nullable: true,
        name: 'birth_date',
        type:"date"
      })
      birthDate: Date;

      @Column({
        nullable: true,
        default: '',
        name: 'document_number'
      })
      documentNumber: string;

}