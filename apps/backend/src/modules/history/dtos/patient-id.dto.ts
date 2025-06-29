import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PatientIdDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    patientId!: number;
}
