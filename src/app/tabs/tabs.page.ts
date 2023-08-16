import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: true,
    imports: [IonicModule,CommonModule, FormsModule]
})
export class TabsPage implements OnInit{

  constructor(private readonly platform: Platform) {}
  async ngOnInit() {
    // if (this.platform.is('capacitor')) {
    //   return;
    // }
    // await FirebaseAnalytics.setEnabled({
    //   enabled: true,
    // });
  }

}
