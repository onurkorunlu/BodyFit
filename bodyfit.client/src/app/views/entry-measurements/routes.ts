import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./entry-measurements.component').then(m => m.EntryMeasurementsComponent),
    data: {
      title: 'Profil'
    }
  }
];

