import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./containers/contact.component'),
  },
];

export default contactRoutes;
