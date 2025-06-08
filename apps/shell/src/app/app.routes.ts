import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { APP_VERSION } from './app.constants';
import { environment } from '../environment';
import { HeaderAppWrapperComponent } from './header-app-wrapper/header-app-wrapper.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => loadRemoteModule({
            type: "module",
            remoteEntry: `${environment.remotesUrl.homeApp}/remoteEntry.js?v=${APP_VERSION}`,
            exposedModule: './web-components'
        }).then(m => m.AppComponent),
    },
    {
        path: "histories",
        loadComponent: () => loadRemoteModule({
            type: "module",
            remoteEntry: `${environment.remotesUrl.historiesApp}/remoteEntry.js?v=${APP_VERSION}`,
            exposedModule: './web-components'
        }).then(m => m.AppComponent),
    },
    {
        path: "patients",
        loadComponent: () => loadRemoteModule({
            type: "module",
            remoteEntry: `${environment.remotesUrl.patientsApp}/remoteEntry.js?v=${APP_VERSION}`,
            exposedModule: './web-components'
        }).then(m => m.AppComponent),
    },
    {
        path: "header",
        //component: HeaderAppWrapperComponent
        loadComponent: () => loadRemoteModule({
            type: "module",
            remoteEntry: `${environment.remotesUrl.headerApp}/remoteEntry.js?v=${APP_VERSION}`,
            exposedModule: './web-components'
        }).then(m => m.AppComponent),
    }
];
