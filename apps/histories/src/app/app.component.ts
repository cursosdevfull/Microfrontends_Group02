import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

interface History {
  id: string;
  medicName: string;
  paramedicName?: string;
  dateAttention: Date;
  symptoms: string;
  observations?: string;
  medicines?: string;
  diagnostic: string;
  patientId: string;
}

@Component({
  selector: 'cdev-histories-element',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() patientId: string | null = null;
  @Input() patientName: string = '';

  histories: History[] = [];
  filteredHistories: History[] = [];
  selectedFilter: string = 'all';
  sortOrder: 'asc' | 'desc' = 'desc';

  ngOnInit() {
    this.loadHistories();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['patientId'] && this.patientId) {
      this.loadHistories();
    }
  }

  loadHistories() {
    if (!this.patientId) {
      this.histories = [];
      this.filteredHistories = [];
      return;
    }

    // Datos de ejemplo - aquí conectarías con tu servicio real
    this.histories = [
      {
        id: '1',
        medicName: 'Dr. Juan Pérez',
        paramedicName: 'Ana García',
        dateAttention: new Date('2024-06-01'),
        symptoms: 'Dolor de cabeza severo, náuseas y sensibilidad a la luz',
        observations: 'Paciente presenta signos de migraña. Se recomienda descanso.',
        medicines: 'Ibuprofeno 400mg cada 8 horas, Paracetamol 500mg si persiste el dolor',
        diagnostic: 'Migraña común',
        patientId: this.patientId
      },
      {
        id: '2',
        medicName: 'Dra. María López',
        dateAttention: new Date('2024-05-15'),
        symptoms: 'Fiebre alta, dolor de garganta y malestar general',
        diagnostic: 'Infección viral de vías respiratorias superiores',
        medicines: 'Acetaminofén, abundantes líquidos y reposo',
        patientId: this.patientId
      },
      {
        id: '3',
        medicName: 'Dr. Carlos Ruiz',
        paramedicName: 'Luis Martínez',
        dateAttention: new Date('2024-04-20'),
        symptoms: 'Dolor abdominal, náuseas y vómitos',
        observations: 'Síntomas compatibles con gastritis. Se solicitan exámenes de laboratorio.',
        diagnostic: 'Gastritis aguda',
        medicines: 'Omeprazol 20mg antes del desayuno, dieta blanda',
        patientId: this.patientId
      }
    ];

    this.applyFilter();
  }

  applyFilter() {
    let filtered = [...this.histories];

    // Filtrar por fecha
    const now = new Date();
    switch (this.selectedFilter) {
      case 'recent':
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(h => h.dateAttention >= sevenDaysAgo);
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(h => h.dateAttention >= monthAgo);
        break;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(h => h.dateAttention >= yearAgo);
        break;
    }

    // Ordenar
    filtered.sort((a, b) => {
      const dateA = a.dateAttention.getTime();
      const dateB = b.dateAttention.getTime();
      return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    this.filteredHistories = filtered;
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.applyFilter();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getPatientInitials(): string {
    if (!this.patientName) return 'P';
    return this.patientName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  selectHistory(history: History) {
    console.log('Historia seleccionada:', history);
  }

  showAddHistoryForm() {
    console.log('Mostrar formulario de nueva historia para paciente:', this.patientId);
  }

  viewHistory(history: History, event: Event) {
    event.stopPropagation();
    console.log('Ver historia:', history);
  }

  editHistory(history: History, event: Event) {
    event.stopPropagation();
    console.log('Editar historia:', history);
  }

  deleteHistory(historyId: string, event: Event) {
    event.stopPropagation();
    console.log('Eliminar historia:', historyId);
  }
}
