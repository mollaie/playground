import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { Router } from "@angular/router";
import { IonicModule, ToastController } from "@ionic/angular";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    template: `
        <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
     Login
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
<ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="small">
      Login
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ng-container class="ion-padding">
    <ion-grid>
        <ion-row>
            <ion-col>
            <ion-input label="Email" type="email"  label-placement="floating" fill="outline" placeholder="Enter email"  [ngModel]="email()" (ionChange)="setEmail($event)"></ion-input>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col>
            <ion-input label="Password" type="password"  label-placement="floating" fill="outline" placeholder="Enter password" [ngModel]="password()" (ionChange)="setPassword($event)"></ion-input>
            </ion-col>
        </ion-row>
    </ion-grid>

    <ion-button (click)="onLogin()" expand="block" fill="solid" shape="round">
      Login
    </ion-button>
    <ion-button (click)="onSignUp()" expand="block" fill="solid" shape="round">
      Sign Up
    </ion-button>
  </ng-container>
</ion-content>
    `,
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginComponent {
    email = signal<string>("");
    password = signal<string>("");

    constructor(private readonly router: Router, private toastController: ToastController) { }
    onSignUp() {
        this.router.navigateByUrl('/auth/signup');
    }
    async onLogin() {
        const result = await FirebaseAuthentication.signInWithEmailAndPassword({
            email: this.email(),
            password: this.password(),
        });
        if (result.user) {
            this.router.navigateByUrl('/tabs/tab1');
        } else {
            const toast = await this.toastController.create({
                message: 'Invalid email or password',
                duration: 1500,
                position: 'bottom',
            });

            await toast.present();
        }
    }

    setEmail(value:any){
        this.email.set(value.detail.value);
    }
    setPassword(value:any){
        this.password.set(value.detail.value);
    }
}