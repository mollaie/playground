import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app/tabs/ROUTES';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
        importProvidersFrom(BrowserModule, IonicModule.forRoot()),
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        importProvidersFrom(
          IonicModule.forRoot(),
       )
    ]
})
  .catch(err => console.log(err));
