import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { Movie } from '../interfaces/interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiService = inject(ApiService);
  private _moviesListS = signal<Movie[]>([]);
  private _loadingS = signal<boolean>(false);
  private _filteredMoviesListS = signal<Movie[]>([]);

// for sharing
  readonly moviesListS = this._moviesListS.asReadonly();
  readonly loadingS = this._loadingS.asReadonly();
  readonly filteredMoviesListS = this._filteredMoviesListS.asReadonly();

  private _filterTitleS = signal<string>('');

  readonly filteredMoviesCS = computed(() => 
    this._moviesListS().filter(movieItem => 
      movieItem.title.includes(this._filterTitleS())
    )
  );

  loadMovies$(): Observable<Movie[]> {
    this._loadingS.set(true);
    return this.apiService.getFilms()
    .pipe(
      catchError((err) => {
        console.error('Ошибка загрузки:', err);
        this._loadingS.set(false);
        return EMPTY;
      }),
      tap((moviesDTO) => {
        setTimeout(() => {
          this._filterTitleS.set('');
          this._moviesListS.set(moviesDTO);
          this._filteredMoviesListS.set(moviesDTO);
          this._loadingS.set(false);
        }, 1000);
      }),
    );
  }

  setFilter(filter: string): void {
    this._filterTitleS.set(filter);
    this._filteredMoviesListS.set(
      this._moviesListS().filter((elem) => 
        elem.title.toLowerCase().includes(filter.toLowerCase()))
    );
  }
}
