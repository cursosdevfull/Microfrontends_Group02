import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { registry } from '../registry';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../environment';
import { APP_VERSION } from '../app.constants';

@Component({
  selector: 'app-header-app-wrapper',
  imports: [],
  templateUrl: './header-app-wrapper.component.html',
  styleUrl: './header-app-wrapper.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderAppWrapperComponent {
  isElementLoaded = signal<boolean>(false);

  ngOnInit() {
    this.loadElement();
  }

  loadElement() {
    const load = () => loadRemoteModule({
      type: "module",
      remoteEntry: `${environment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components'
    })

    load().then((m: any) => {
      const comp = m.AppComponent
      console.log('Header app loaded successfully', comp);
      this.isElementLoaded.set(true);
    }).catch((error: any) => {
      console.error('Error loading header app:', error);
    })

    /* const importFn = registry.headerApp;




    importFn()
      .then(m => {
        const comp = m.AppComponent
        console.log('Header app loaded successfully', comp);
      })
      .catch((error: any) => {
        console.error('Error loading header app:', error);
      }); */
  }
}
