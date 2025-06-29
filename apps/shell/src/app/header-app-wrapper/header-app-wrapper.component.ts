import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { registry } from '../registry';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-header-app-wrapper',
  imports: [],
  templateUrl: './header-app-wrapper.component.html',
})
export class HeaderAppWrapperComponent {
  @ViewChild("remoteHeader", { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  async ngAfterViewInit() {
    this.viewContainerRef.clear();

    const m = await loadRemoteModule({
      type: "module",
      remoteEntry: `${environment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components'
    })

    this.viewContainerRef.createComponent(m.AppComponent);
  }
}
