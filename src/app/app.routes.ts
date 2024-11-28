import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact.routes'),
  },
  { path: '**', redirectTo: 'contact' },
];
