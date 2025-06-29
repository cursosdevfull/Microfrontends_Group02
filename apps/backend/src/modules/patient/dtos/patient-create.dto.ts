import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PatientCreateDto {
    @IsNotEmpty()
    @IsString()
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    lastName!: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    age!: number;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber!: string;

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsNotEmpty()
    @IsString()
    gender!: string;
}
