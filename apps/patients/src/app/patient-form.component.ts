import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService, Patient, CreatePatientDto, UpdatePatientDto } from './patient.service';

@Component({
    selector: 'app-patient-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    template: `
    <div class="form-overlay" *ngIf="isVisible" (click)="onOverlayClick($event)">
      <div class="form-container" (click)="$event.stopPropagation()">
        <div class="form-header">
          <h2>{{ isEditMode ? 'Editar Paciente' : 'Nuevo Paciente' }}</h2>
          <button type="button" class="close-btn" (click)="close()">
            <i class="icon-close">✕</i>
          </button>
        </div>

        <form [formGroup]="patientForm" (ngSubmit)="onSubmit()" class="patient-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Nombre *</label>
              <input 
                id="firstName"
                type="text" 
                formControlName="firstName"
                class="form-control"
                [class.error]="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched"
                placeholder="Ingrese el nombre"
              >
              <div class="error-message" *ngIf="patientForm.get('firstName')?.invalid && patientForm.get('firstName')?.touched">
                <span *ngIf="patientForm.get('firstName')?.errors?.['required']">El nombre es requerido</span>
                <span *ngIf="patientForm.get('firstName')?.errors?.['minlength']">Mínimo 2 caracteres</span>
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Apellido *</label>
              <input 
                id="lastName"
                type="text" 
                formControlName="lastName"
                class="form-control"
                [class.error]="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched"
                placeholder="Ingrese el apellido"
              >
              <div class="error-message" *ngIf="patientForm.get('lastName')?.invalid && patientForm.get('lastName')?.touched">
                <span *ngIf="patientForm.get('lastName')?.errors?.['required']">El apellido es requerido</span>
                <span *ngIf="patientForm.get('lastName')?.errors?.['minlength']">Mínimo 2 caracteres</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="age">Edad *</label>
              <input 
                id="age"
                type="number" 
                formControlName="age"
                class="form-control"
                [class.error]="patientForm.get('age')?.invalid && patientForm.get('age')?.touched"
                placeholder="Edad"
                min="1"
                max="120"
              >
              <div class="error-message" *ngIf="patientForm.get('age')?.invalid && patientForm.get('age')?.touched">
                <span *ngIf="patientForm.get('age')?.errors?.['required']">La edad es requerida</span>
                <span *ngIf="patientForm.get('age')?.errors?.['min']">Edad mínima: 1 año</span>
                <span *ngIf="patientForm.get('age')?.errors?.['max']">Edad máxima: 120 años</span>
              </div>
            </div>

            <div class="form-group">
              <label for="gender">Género *</label>
              <select 
                id="gender"
                formControlName="gender"
                class="form-control"
                [class.error]="patientForm.get('gender')?.invalid && patientForm.get('gender')?.touched"
              >
                <option value="">Seleccione género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
              <div class="error-message" *ngIf="patientForm.get('gender')?.invalid && patientForm.get('gender')?.touched">
                <span *ngIf="patientForm.get('gender')?.errors?.['required']">El género es requerido</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Correo Electrónico *</label>
            <input 
              id="email"
              type="email" 
              formControlName="email"
              class="form-control"
              [class.error]="patientForm.get('email')?.invalid && patientForm.get('email')?.touched"
              placeholder="correo@ejemplo.com"
            >
            <div class="error-message" *ngIf="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
              <span *ngIf="patientForm.get('email')?.errors?.['required']">El correo es requerido</span>
              <span *ngIf="patientForm.get('email')?.errors?.['email']">Formato de correo inválido</span>
            </div>
          </div>

          <div class="form-group">
            <label for="phoneNumber">Teléfono *</label>
            <input 
              id="phoneNumber"
              type="tel" 
              formControlName="phoneNumber"
              class="form-control"
              [class.error]="patientForm.get('phoneNumber')?.invalid && patientForm.get('phoneNumber')?.touched"
              placeholder="+57 300 123 4567"
            >
            <div class="error-message" *ngIf="patientForm.get('phoneNumber')?.invalid && patientForm.get('phoneNumber')?.touched">
              <span *ngIf="patientForm.get('phoneNumber')?.errors?.['required']">El teléfono es requerido</span>
              <span *ngIf="patientForm.get('phoneNumber')?.errors?.['pattern']">Formato de teléfono inválido</span>
            </div>
          </div>

          <div class="form-group">
            <label for="address">Dirección *</label>
            <textarea 
              id="address"
              formControlName="address"
              class="form-control textarea"
              [class.error]="patientForm.get('address')?.invalid && patientForm.get('address')?.touched"
              placeholder="Ingrese la dirección completa"
              rows="3"
            ></textarea>
            <div class="error-message" *ngIf="patientForm.get('address')?.invalid && patientForm.get('address')?.touched">
              <span *ngIf="patientForm.get('address')?.errors?.['required']">La dirección es requerida</span>
              <span *ngIf="patientForm.get('address')?.errors?.['minlength']">Mínimo 10 caracteres</span>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" (click)="close()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="patientForm.invalid || isSubmitting"
            >
              <span *ngIf="isSubmitting" class="spinner">⏳</span>
              {{ isEditMode ? 'Actualizar' : 'Crear' }} Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .form-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    }

    .form-container {
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 24px 0;
      border-bottom: 1px solid #f1f3f4;
      margin-bottom: 24px;
    }

    .form-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .close-btn {
      background: #f8f9fa;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #6c757d;
    }

    .close-btn:hover {
      background: #e9ecef;
      color: #495057;
    }

    .patient-form {
      padding: 0 24px 24px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #2c3e50;
      font-size: 0.9rem;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e1e8ed;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background: #f8f9fa;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.error {
      border-color: #e74c3c;
      background: #fdf2f2;
    }

    .textarea {
      resize: vertical;
      min-height: 80px;
    }

    .error-message {
      margin-top: 4px;
      font-size: 0.8rem;
      color: #e74c3c;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #f1f3f4;
    }

    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-secondary {
      background: #f8f9fa;
      color: #6c757d;
      border: 2px solid #e9ecef;
    }

    .btn-secondary:hover {
      background: #e9ecef;
      color: #495057;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .form-container {
        width: 95%;
        margin: 20px;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-header {
        padding: 16px 16px 0;
      }

      .patient-form {
        padding: 0 16px 16px;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class PatientFormComponent implements OnInit, OnChanges {
    @Input() isVisible = false;
    @Input() patient: Patient | null = null;
    @Output() patientSaved = new EventEmitter<Patient>();
    @Output() formClosed = new EventEmitter<void>();

    patientForm!: FormGroup;
    isEditMode = false;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private patientService: PatientService
    ) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnChanges() {
        if (this.patient) {
            this.isEditMode = true;
            this.populateForm();
        } else {
            this.isEditMode = false;
            this.resetForm();
        }
    }

    private createForm() {
        this.patientForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
            gender: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
            address: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    private populateForm() {
        if (this.patient && this.patientForm) {
            this.patientForm.patchValue({
                firstName: this.patient.firstName,
                lastName: this.patient.lastName,
                age: this.patient.age,
                gender: this.patient.gender,
                email: this.patient.email,
                phoneNumber: this.patient.phoneNumber,
                address: this.patient.address
            });
        }
    }

    private resetForm() {
        if (this.patientForm) {
            this.patientForm.reset();
        }
    }

    onSubmit() {
        if (this.patientForm.valid) {
            this.isSubmitting = true;
            const formValue = this.patientForm.value;

            if (this.isEditMode && this.patient) {
                // Update existing patient
                const updateData: UpdatePatientDto = formValue;
                this.patientService.updatePatient(this.patient.patientId, updateData).subscribe({
                    next: (updatedPatient) => {
                        this.patientSaved.emit(updatedPatient);
                        this.close();
                        this.isSubmitting = false;
                    },
                    error: (error) => {
                        console.error('Error updating patient:', error);
                        this.isSubmitting = false;
                    }
                });
            } else {
                // Create new patient
                const createData: CreatePatientDto = formValue;
                this.patientService.createPatient(createData).subscribe({
                    next: (newPatient) => {
                        this.patientSaved.emit(newPatient);
                        this.close();
                        this.isSubmitting = false;
                    },
                    error: (error) => {
                        console.error('Error creating patient:', error);
                        this.isSubmitting = false;
                    }
                });
            }
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.patientForm.controls).forEach(key => {
                this.patientForm.get(key)?.markAsTouched();
            });
        }
    }

    close() {
        this.isVisible = false;
        this.resetForm();
        this.formClosed.emit();
    }

    onOverlayClick(event: Event) {
        this.close();
    }
}
