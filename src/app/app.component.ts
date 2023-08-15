import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { RemoteConfigService } from './remoteConfig.service';
import { Platform } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonicModule],
})
export class AppComponent implements OnInit{
  constructor(private remoteConfig:RemoteConfigService,private readonly platform: Platform) {
    this.initializeFirebase();
  }

  async ngOnInit() {

    await this.remoteConfig.fetchConfig();

    await this.remoteConfig.active();

    await SplashScreen.show({
      autoHide: false,
    });

    await SplashScreen.hide();

  }

  public async initializeFirebase(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    initializeApp(environment.firebase);
  }
}
