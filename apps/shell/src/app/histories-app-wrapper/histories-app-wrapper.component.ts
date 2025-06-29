import { Component, ViewChild, ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-histories-app-wrapper',
  imports: [],
  templateUrl: './histories-app-wrapper.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HistoriesAppWrapperComponent {
  @ViewChild("remoteHistory", { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  @Input() patientId: number | null = null;
  @Input() patientName: string = '';

  async ngAfterViewInit() {
    this.viewContainerRef.clear();

    const m = await loadRemoteModule({
      type: "module",
      remoteEntry: `${environment.remotesUrl.historiesApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components'
    })

    this.viewContainerRef.createComponent(m.AppComponent);
  }
}

