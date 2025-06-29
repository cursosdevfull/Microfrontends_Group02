import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { APP_VERSION } from './app.constants';
import { environment } from '../environment';
import { HeaderAppWrapperComponent } from './header-app-wrapper/header-app-wrapper.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderAppWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shell';

  constructor() {
    this.loadComponent();
  }

  async loadComponent() {
    const header = await loadRemoteModule({
      type: "module",
      remoteEntry: `${environment.remotesUrl.historiesApp}/remoteEntry.js?v=${APP_VERSION}`,
      exposedModule: './web-components'
    }).then(m => m.AppComponent);

    console.log("header", header)
    //const component = header.AppComponent;
  }
}
