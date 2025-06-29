import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from "class-validator";

export class HistoryCreateDto {
    @IsNotEmpty()
    @IsString()
    medicName!: string;

    @IsNotEmpty()
    @IsString()
    paramedicName!: string;

    @IsNotEmpty()
    @IsDateString()
    dateAttention!: string;

    @IsNotEmpty()
    @IsString()
    symptoms!: string;

    @IsOptional()
    @IsString()
    observations?: string;

    @IsOptional()
    @IsString()
    medicines?: string;

    @IsNotEmpty()
    @IsString()
    diagnostic!: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    patientId!: number;
}
