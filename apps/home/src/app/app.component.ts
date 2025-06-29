import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface DetailedStat {
  icon: string;
  value: string;
  name: string;
}

@Component({
  selector: 'cdev-home-element',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Sistema Médico';

  stats = {
    patients: '1,247',
    histories: '3,892',
    doctors: '45'
  };

  features: Feature[] = [
    {
      icon: '👥',
      title: 'Gestión de Pacientes',
      description: 'Registra y gestiona información completa de pacientes con interfaz intuitiva y búsqueda avanzada.'
    },
    {
      icon: '📋',
      title: 'Historias Clínicas',
      description: 'Crea y consulta historias médicas detalladas con seguimiento completo de tratamientos.'
    },
    {
      icon: '🔒',
      title: 'Seguridad Médica',
      description: 'Cumple con estándares de seguridad médica y protección de datos de pacientes.'
    },
    {
      icon: '📊',
      title: 'Reportes Avanzados',
      description: 'Genera reportes estadísticos y análisis médicos para toma de decisiones informadas.'
    },
    {
      icon: '⚡',
      title: 'Acceso Rápido',
      description: 'Interfaz optimizada para acceso rápido a información crítica en situaciones de emergencia.'
    },
    {
      icon: '🌐',
      title: 'Multiplataforma',
      description: 'Accede desde cualquier dispositivo con sincronización en tiempo real de datos médicos.'
    }
  ];

  detailedStats: DetailedStat[] = [
    {
      icon: '👥',
      value: '1,247',
      name: 'Pacientes Registrados'
    },
    {
      icon: '📋',
      value: '3,892',
      name: 'Historias Clínicas'
    },
    {
      icon: '👨‍⚕️',
      value: '45',
      name: 'Médicos Activos'
    },
    {
      icon: '🏥',
      value: '12',
      name: 'Especialidades'
    }
  ];

  ngOnInit(): void {
    // Animación de números (opcional)
    this.animateStats();
  }

  navigateToPatients(): void {
    // Aquí implementarías la navegación a la sección de pacientes
    console.log('Navegando a pacientes...');
    // Ejemplo: this.router.navigate(['/patients']);
  }

  navigateToHistories(): void {
    // Aquí implementarías la navegación a historias
    console.log('Navegando a historias...');
    // Ejemplo: this.router.navigate(['/histories']);
  }

  showReports(): void {
    console.log('Mostrando reportes...');
    // Implementar lógica para mostrar reportes
  }

  showCalendar(): void {
    console.log('Mostrando calendario...');
    // Implementar lógica para mostrar calendario médico
  }

  scrollToFeatures(): void {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  private animateStats(): void {
    // Opcional: Animar los números de estadísticas
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Aquí podrías animar los números si quisieras
      // Por ahora mantenemos los valores estáticos

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
