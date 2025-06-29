import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from "class-validator";

export class HistoryUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    historyId!: number;

    @IsOptional()
    @IsString()
    medicName?: string;

    @IsOptional()
    @IsString()
    paramedicName?: string;

    @IsOptional()
    @IsDateString()
    dateAttention?: string;

    @IsOptional()
    @IsString()
    symptoms?: string;

    @IsOptional()
    @IsString()
    observations?: string;

    @IsOptional()
    @IsString()
    medicines?: string;

    @IsOptional()
    @IsString()
    diagnostic?: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    patientId?: number;
}
