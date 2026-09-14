import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () => import('./home/home').then(m => m.Home),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./home/dashboard/dashboard').then(m => m.Dashboard) },
        ]
    },
    { path: 'signin', loadComponent: () => import('./sign-in/sign-in').then(m => m.SignIn) },
    { path: 'signup', loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp) },
];
