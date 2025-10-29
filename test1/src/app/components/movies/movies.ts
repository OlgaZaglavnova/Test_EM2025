import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movies',
  imports: [MovieCard],
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

  onInputChange(val: string): void {
    this.moviesService.setFilter(val);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
