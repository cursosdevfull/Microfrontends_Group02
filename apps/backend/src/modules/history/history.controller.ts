import { validate } from "class-validator";
import { HistoryService } from "./history.service";
import { Request, Response } from "express";
import { HistoryCreateDto } from "./dtos/history-create.dto";
import { HistoryUpdateDto } from "./dtos/history-update.dto";
import { HistoryIdDto } from "./dtos/history-id.dto";
import { HistoryPaginationDto } from "./dtos/history-pagination.dto";
import { PatientIdDto } from "./dtos/patient-id.dto";
import { HistoryEntity } from "./history.entity";
import { PatientService } from "../patient/patient.service";
import { PatientEntity } from "../patient/patient.entity";

export class HistoryController {
    constructor(private readonly serviceHistory: HistoryService, private readonly servicePatient: PatientService) { }

    async create(request: Request, response: Response) {
        const { medicName, paramedicName, dateAttention, symptoms, observations, medicines, diagnostic, patientId } = request.body;

        const history = new HistoryCreateDto();
        history.medicName = medicName;
        history.paramedicName = paramedicName;
        history.dateAttention = dateAttention;
        history.symptoms = symptoms;
        history.observations = observations;
        history.medicines = medicines;
        history.diagnostic = diagnostic;
        history.patientId = patientId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const patient = await this.servicePatient.getOne(history.patientId);
        if (!patient) {
            return response.status(404).send("Patient not found");
        }

        const entity = new HistoryEntity();
        entity.medicName = history.medicName;
        entity.paramedicName = history.paramedicName;
        entity.dateAttention = new Date(history.dateAttention);
        entity.symptoms = history.symptoms;
        entity.observations = history.observations;
        entity.medicines = history.medicines;
        entity.diagnostic = history.diagnostic;
        entity.patient = patient
        entity.createdAt = new Date();

        const result = await this.serviceHistory.save(entity);

        response.status(201).json(result);
    }

    async update(request: Request, response: Response) {
        const { medicName, paramedicName, dateAttention, symptoms, observations, medicines, diagnostic, patientId } = request.body;
        const { historyId } = request.params;

        const history = new HistoryUpdateDto();
        history.historyId = +historyId;
        history.medicName = medicName;
        history.paramedicName = paramedicName;
        history.dateAttention = dateAttention;
        history.symptoms = symptoms;
        history.observations = observations;
        history.medicines = medicines;
        history.diagnostic = diagnostic;
        history.patientId = patientId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        let patient: PatientEntity | null = null;

        if (patientId) {
            patient = await this.servicePatient.getOne(patientId);
            if (!patient) {
                return response.status(404).send("Patient not found");
            }
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        historyFound.updatedAt = new Date();
        if (patient) {
            historyFound.patient = patient;
        }
        if (history.dateAttention) {
            historyFound.dateAttention = new Date(history.dateAttention);
        }

        const result = await this.serviceHistory.save(Object.assign(historyFound, history));

        response.status(201).json(result);
    }

    async delete(request: Request, response: Response) {
        const { historyId } = request.params;

        const history = new HistoryIdDto();
        history.historyId = +historyId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        historyFound.deletedAt = new Date(); // Soft delete

        const result = await this.serviceHistory.save(historyFound);

        response.status(201).json(result);
    }

    async getOne(request: Request, response: Response) {
        const { historyId } = request.params;

        const history = new HistoryIdDto();
        history.historyId = +historyId;

        const errors = await validate(history);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const historyFound = await this.serviceHistory.getOne(history.historyId);
        if (!historyFound) {
            return response.status(404).send("History not found");
        }

        response.status(200).json(historyFound);
    }

    async getAll(request: Request, response: Response) {
        const result = await this.serviceHistory.getAll();

        response.status(200).json(result);
    }

    async getByPatientId(request: Request, response: Response) {
        const { patientId } = request.params;

        const patient = new PatientIdDto();
        patient.patientId = +patientId;

        const errors = await validate(patient);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const result = await this.serviceHistory.getByPatientId(patient.patientId);

        response.status(200).json(result);
    }

    async getByPage(request: Request, response: Response) {
        const { page, limit } = request.query;

        const pagination = new HistoryPaginationDto();
        pagination.page = page ? +page : 1; // Default to page 1 if undefined
        pagination.limit = limit ? +limit : 10; // Default to limit 10 if undefined

        const errors = await validate(pagination);
        if (errors.length > 0) {
            return response.status(411).send(errors);
        }

        const result = await this.serviceHistory.getByPage(pagination.page, pagination.limit);

        response.status(200).json(result);
    }
}
