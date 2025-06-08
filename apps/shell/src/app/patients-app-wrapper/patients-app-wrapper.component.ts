import { ChangeDetectionStrategy, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { registry } from '../registry';

@Component({
  selector: 'app-patients-app-wrapper',
  imports: [],
  templateUrl: './patients-app-wrapper.component.html',
  styleUrl: './patients-app-wrapper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsAppWrapperComponent {
  isElementLoaded = false;

  cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.loadElement()
  }

  loadElement() {
    const importFn = registry.patientsApp

    importFn()
      .then(() => {
        this.isElementLoaded = true;
        this.cdr.detectChanges();
        console.log('Patients app loaded successfully');
      })
      .catch((error: any) => {
        console.error('Error loading patients app:', error);
      });
  }
}
