import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieDetails } from '../movie-details/movie-details';

@Component({
  selector: 'app-movies',
  imports: [MovieCard, MovieDetails, MatProgressSpinnerModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit, OnDestroy {
  moviesService = inject(MoviesService);
  readonly dialog = inject(MatDialog);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.loadMovies('');
  }

  loadMovies(filter: string): void {
    this.moviesService.setFilter(filter);
    this.moviesService.loadMoviesByFilter$().pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  onInputChange(val: string): void {
    this.loadMovies(val);
  }

  showMovieDetails(movie: Movie): void {
    console.log('CLICKED: ', movie)
    this.moviesService.setSelectedMovie(movie);
    this.dialog.open(MovieDetails, {
      width: '70vw',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      panelClass: 'movie-details-dialog',
      data: {
        mservice: this.moviesService
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
