import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService, Patient } from './patient.service';
import { PatientFormComponent } from './patient-form.component';

@Component({
  selector: 'cdev-patients-element',
  imports: [FormsModule, CommonModule, PatientFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @Output() patientSelected = new EventEmitter<{ id: string; name: string }>();
  @Input() selectedPatientId: string | null = null;
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchTerm: string = '';

  // Form state
  showForm = false;
  selectedPatientForEdit: Patient | null = null;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.filteredPatients = [...this.patients];
      },
      error: (error) => {
        console.error('Error loading patients:', error);
        // For now, keep the mock data as fallback
        this.loadMockData();
      }
    });
  }

  private loadMockData() {
    // Fallback mock data
    this.patients = [
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
    ];
    this.filteredPatients = [...this.patients];
  }
  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredPatients = [...this.patients];
      return;
    }

    this.filteredPatients = this.patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const searchTerm = this.searchTerm.toLowerCase();

      return fullName.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm) ||
        patient.phoneNumber.includes(this.searchTerm) ||
        patient.address.toLowerCase().includes(searchTerm);
    });
  }
  selectPatient(patient: Patient) {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    this.patientSelected.emit({
      id: patient.patientId.toString(),
      name: fullName
    });
  }

  getInitials(firstName: string, lastName: string): string {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }

  getFullName(patient: Patient): string {
    return `${patient.firstName} ${patient.lastName}`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  showAddPatientForm() {
    this.selectedPatientForEdit = null;
    this.showForm = true;
  }

  onPatientSaved(patient: Patient) {
    this.loadPatients();
    this.showForm = false;
  }

  onFormClosed() {
    this.showForm = false;
    this.selectedPatientForEdit = null;
  } editPatient(patient: Patient, event: Event) {
    event.stopPropagation();
    this.selectedPatientForEdit = patient;
    this.showForm = true;
  }
  deletePatient(patientId: string, event: Event) {
    event.stopPropagation();
    if (confirm('¿Está seguro que desea eliminar este paciente?')) {
      this.patientService.deletePatient(Number(patientId)).subscribe({
        next: () => {
          this.loadPatients();
          console.log('Paciente eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error deleting patient:', error);
          alert('Error al eliminar el paciente. Por favor, intente nuevamente.');
        }
      });
    }
  }
}
