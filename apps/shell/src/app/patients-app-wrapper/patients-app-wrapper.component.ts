import { Component, ViewChild, ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-patients-app-wrapper',
  imports: [],
  templateUrl: './patients-app-wrapper.component.html',
})
export class PatientsAppWrapperComponent {
  @ViewChild("remotePatient", { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  @Input() selectedPatientId: number | null = null;
  async ngAfterViewInit() {
    this.viewContainerRef.clear();

    const m = await loadRemoteModule({
      type: "module",
      remoteEntry: `${environment.remotesUrl.patientsApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components'
    })

    this.viewContainerRef.createComponent(m.AppComponent);
  }
}
