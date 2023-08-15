import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: 'app-auth',
    template: `
    <ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
     Authentication
    </ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
<ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="small">
Authentication
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ng-container class="ion-padding">
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
    imports: [IonicModule, CommonModule],
})
export class AuthComponent {
    constructor(private readonly router: Router) { }
    onSignUp() {
        this.router.navigateByUrl('auth/signup');
    }
    onLogin() {
        this.router.navigateByUrl('/auth/login');
    }

}