import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Preferences } from '@capacitor/preferences';
import { Toast } from '@capacitor/toast';
import { Dialog } from '@capacitor/dialog';
@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [
      IonicModule,
      CommonModule,
      FormsModule
    ]
})
export class Tab1Page {
async onGetPreferences() {
  const { value } = await Preferences.get({ key: 'name' });

  await Toast.show({
    text: value!,
    duration:'short',
    position:'top',

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


async onShowAlert (){
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

  constructor() {}

}
