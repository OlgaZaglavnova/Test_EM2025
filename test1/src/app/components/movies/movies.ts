import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/interfaces';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit, OnDestroy {
  moviesService = inject(MoviesService);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.moviesService.loadMovies$()
    .pipe(takeUntil(this.destroy$))
    .subscribe((moviesList) => {
      console.log('LOADED: ', moviesList)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
