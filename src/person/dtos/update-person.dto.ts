export class UpdatePersonDto {
    readonly id : string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly birthDate: Date;
    readonly documentNumber: string;
}