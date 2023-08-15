import { ErrorHandler, enableProdMode, importProvidersFrom } from '@angular/core';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { routes } from './app/tabs/ROUTES';
import { GlobalErrorHandlerService } from './app/global-error-handler.service';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule, IonicModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
    importProvidersFrom(
      IonicModule.forRoot(),
    )
  ]
})
  .catch(err => console.log(err));
