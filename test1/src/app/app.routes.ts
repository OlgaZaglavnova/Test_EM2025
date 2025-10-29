import { Routes } from '@angular/router';
import { ApiService } from './services/api.service';
import { MoviesService } from './services/movies.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
    },
    {
        path: 'movies',
        providers: [ApiService, MoviesService],
        loadComponent: () => import('./components/movies/movies').then(m => m.Movies)
    }
];
