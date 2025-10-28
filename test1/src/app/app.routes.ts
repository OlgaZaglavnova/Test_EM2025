import { Routes } from '@angular/router';
import { ApiService } from './services/api.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        providers: [ApiService],
        loadComponent: () => import('./components/movies/movies').then(m => m.Movies)
    }
];
