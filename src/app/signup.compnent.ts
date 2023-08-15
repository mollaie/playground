import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { IonicModule, ToastController } from "@ionic/angular";

@Component({
    selector: 'app-signup',
    template: `
        <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
     Sign Up
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
<ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="small">
      Sign Up
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
export class SignUpComponent { 
    email = signal<string>("");
    password = signal<string>("");

    constructor(private readonly router: Router, private toastController: ToastController) { }
    async onSignUp() {
        const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
            email: this.email(),
            password: this.password(),
          });
          if(result.user){
            const toast = await this.toastController.create({
                message: 'Registration is done, please login',
                duration: 1500,
                position: 'bottom',
            });

            await toast.present();
            this.router.navigateByUrl('/auth/login');
          }else{
            const toast = await this.toastController.create({
                message: 'Unable to register you',
                duration: 1500,
                position: 'bottom',
            });

            await toast.present();
          }
          
    }
    async onLogin() {
        this.router.navigateByUrl('/auth/login');
    }

    setEmail(value:any){
        this.email.set(value.detail.value);
    }
    setPassword(value:any){
        this.password.set(value.detail.value);
    }
}