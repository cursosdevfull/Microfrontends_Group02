import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Patient {
    patientId: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CreatePatientDto {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
}

export interface UpdatePatientDto {
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
    phoneNumber?: string;
    address?: string;
    gender?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private readonly apiUrl = 'http://localhost:3000/api/patients';

    constructor(private http: HttpClient) { }

    getAllPatients(): Observable<Patient[]> {
        // For now, return mock data. Later this will connect to the backend
        return of([
            {
                patientId: 1,
                firstName: 'María',
                lastName: 'González',
                age: 28,
                email: 'maria.gonzalez@email.com',
                phoneNumber: '+57 300 123 4567',
                address: 'Calle 123 # 45-67, Bogotá',
                gender: 'Femenino',
                createdAt: new Date('2024-01-15'),
                updatedAt: new Date('2024-05-20')
            },
            {
                patientId: 2,
                firstName: 'Carlos',
                lastName: 'Rodríguez',
                age: 35,
                email: 'carlos.rodriguez@email.com',
                phoneNumber: '+57 301 987 6543',
                address: 'Carrera 67 # 89-12, Medellín',
                gender: 'Masculino',
                createdAt: new Date('2024-02-10'),
                updatedAt: new Date('2024-04-15')
            },
            {
                patientId: 3,
                firstName: 'Ana',
                lastName: 'Martínez',
                age: 42,
                email: 'ana.martinez@email.com',
                phoneNumber: '+57 302 555 7890',
                address: 'Avenida 45 # 23-89, Cali',
                gender: 'Femenino',
                createdAt: new Date('2024-03-05')
            },
            {
                patientId: 4,
                firstName: 'Luis',
                lastName: 'Hernández',
                age: 29,
                email: 'luis.hernandez@email.com',
                phoneNumber: '+57 305 444 1234',
                address: 'Calle 78 # 12-34, Barranquilla',
                gender: 'Masculino',
                createdAt: new Date('2024-01-20')
            },
            {
                patientId: 5,
                firstName: 'Patricia',
                lastName: 'López',
                age: 38,
                email: 'patricia.lopez@email.com',
                phoneNumber: '+57 304 777 9999',
                address: 'Transversal 89 # 56-12, Bucaramanga',
                gender: 'Femenino',
                createdAt: new Date('2024-02-28'),
                updatedAt: new Date('2024-06-01')
            }
        ]);

        // When ready to connect to backend, uncomment this:
        // return this.http.get<Patient[]>(this.apiUrl);
    }

    getPatientById(id: number): Observable<Patient> {
        // Mock implementation - will connect to backend later
        return of({
            patientId: id,
            firstName: 'Mock',
            lastName: 'Patient',
            age: 30,
            email: 'mock@email.com',
            phoneNumber: '+57 300 000 0000',
            address: 'Mock Address',
            gender: 'Otro',
            createdAt: new Date()
        });

        // When ready to connect to backend, uncomment this:
        // return this.http.get<Patient>(`${this.apiUrl}/${id}`);
    }

    createPatient(patient: CreatePatientDto): Observable<Patient> {
        // Mock implementation - will connect to backend later
        const newPatient: Patient = {
            patientId: Math.floor(Math.random() * 1000) + 100,
            ...patient,
            createdAt: new Date()
        };
        return of(newPatient);

        // When ready to connect to backend, uncomment this:
        // return this.http.post<Patient>(this.apiUrl, patient);
    }

    updatePatient(id: number, updates: UpdatePatientDto): Observable<Patient> {
        // Mock implementation - will connect to backend later
        const updatedPatient: Patient = {
            patientId: id,
            firstName: updates.firstName || 'Updated',
            lastName: updates.lastName || 'Patient',
            age: updates.age || 30,
            email: updates.email || 'updated@email.com',
            phoneNumber: updates.phoneNumber || '+57 300 000 0000',
            address: updates.address || 'Updated Address',
            gender: updates.gender || 'Otro',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return of(updatedPatient);

        // When ready to connect to backend, uncomment this:
        // return this.http.patch<Patient>(`${this.apiUrl}/${id}`, updates);
    }

    deletePatient(id: number): Observable<void> {
        // Mock implementation - will connect to backend later
        return of(undefined);

        // When ready to connect to backend, uncomment this:
        // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
