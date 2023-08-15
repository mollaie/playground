import { Component, OnInit, effect } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Preferences } from '@capacitor/preferences';
import { Toast } from '@capacitor/toast';
import { Dialog } from '@capacitor/dialog';
import { LocalNotifications } from '@capacitor/local-notifications';
import { RemoteConfigService } from '../remoteConfig.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    RemoteConfigService
  ]
})
export class Tab1Page implements OnInit {
  appTitle: string = "";
  appVersion: number = 0;
  constructor(public remoteConfig: RemoteConfigService) {


    effect(() => {
      this.appTitle = this.remoteConfig.appSetting().title;
      this.appVersion = this.remoteConfig.appSetting().version;
    })
  }
  async ngOnInit() {
    await this.fetchConfig();
  }

  async onGetPreferences() {
    const { value } = await Preferences.get({ key: 'name' });

    await Toast.show({
      text: value!,
      duration: 'short',
      position: 'top',

    });
  }
  async onSetPreferences() {
    await Preferences.set({
      key: 'name',
      value: 'Max',
    });
  }
  onShowModal() {
    throw new Error('Method not implemented.');
  }
  async onShowActionSheet() {
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });

    console.log('Action Sheet result:', result);
  }
  async onShowAlert() {
    await Dialog.alert({
      title: 'Stop',
      message: 'this is an error',
    });
  };
  async onShowConfirm() {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you'd like to press the red button?`,
    });

    console.log('Confirmed:', value);
  };
  async onShowPrompt() {
    const { value, cancelled } = await Dialog.prompt({
      title: 'Hello',
      message: `What's your name?`,
    });

    console.log('Name:', value);
    console.log('Cancelled:', cancelled);
  };
  async onDisplayNotification() {
    const granted = await LocalNotifications.requestPermissions();

    if (granted.display === 'granted') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'My Notification Title',
            body: 'This is the body of the notification',
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }, // 5 seconds from now
            actionTypeId: '',
            extra: null,
          }
        ]
      });
    }
  }

  async fetchConfig() {
    const title = await this.remoteConfig.getString();
    const version = await this.remoteConfig.getNumber();
    this.remoteConfig.appSetting.set({
      title,
      version
    });  
  }
}
