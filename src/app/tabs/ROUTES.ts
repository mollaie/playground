import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthComponent } from '../auth.component';
import { LoginComponent } from '../login.component';
import { SignUpComponent } from '../signup.compnent';

export const routes: Routes = [
  {
    path:'auth',
    component:AuthComponent,
  },
  {
    path:'auth/login',
    component:LoginComponent
  },
  {
    path:'auth/signup',
    component:SignUpComponent
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page)
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page)
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then(m => m.Tab3Page)
      },
      {
        path: 'tab4',
        loadComponent: () => import('../tab4/tab4.page').then(m => m.Tab4Page)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];
