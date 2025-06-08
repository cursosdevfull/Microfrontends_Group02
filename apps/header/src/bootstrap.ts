import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(async function() {
  const envInjector = await createApplication(appConfig)
  const ce = createCustomElement(AppComponent, {injector: envInjector.injector})
  customElements.define('cdev-header-element', ce)
})()
