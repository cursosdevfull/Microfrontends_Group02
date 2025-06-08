import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';

(async function () {
  const envInjector = await createApplication(appConfig)
  const ce = createCustomElement(AppComponent, { injector: envInjector.injector })
  customElements.define('cdev-histories-element', ce)
})()
