import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services').then((m) => m.Services),
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./features/how-it-works/how-it-works').then((m) => m.HowItWorks),
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq').then((m) => m.Faq),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'get-quote',
    loadComponent: () => import('./features/quote/quote').then((m) => m.Quote),
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers').then((m) => m.Careers),
  },
  {
    path: 'careers/apply',
    loadComponent: () => import('./features/careers/job-apply').then((m) => m.JobApply),
  },
  {
    path: 'careers/:jobId/apply',
    loadComponent: () => import('./features/careers/job-apply').then((m) => m.JobApply),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
