import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Movie } from '../interfaces/interfaces';
import { ApiService } from './api.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar)
  private _loadingS = signal<boolean>(false);
  private _filteredMoviesListS = signal<Movie[]>([]);  
  private _filterTitleS = signal<string>('');

// for sharing
  readonly loadingS = this._loadingS.asReadonly();
  readonly filteredMoviesListS = this._filteredMoviesListS.asReadonly();

  setFilter(filter: string): void {
    this._filterTitleS.set(filter);
  }

  loadMoviesByFilter$(): Observable<Movie[]> {
    this._loadingS.set(true);
    return this.apiService.getMoviesByTitle(this._filterTitleS())
      .pipe(
        catchError((err) => {
          console.error('Ошибка загрузки:', err);
          this.snackBar.open(
            'Ошибка загрузки', '', 
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
              horizontalPosition: 'right',
              verticalPosition: 'top'
            }
          );
          this._loadingS.set(false);
          return EMPTY;
        }),
        tap((moviesDTO) => {
          // Имитируем работу сети с задержкой ответа
          setTimeout(() => {
            this._filteredMoviesListS.set(moviesDTO);
            this._loadingS.set(false);
          }, 1000);
        }),
      );
    
  }

}
