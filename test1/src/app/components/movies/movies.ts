import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieDetails } from '../movie-details/movie-details';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [FormsModule, MovieCard, MovieDetails, MatProgressSpinnerModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit, OnDestroy {
  filterValue = '';
  
  moviesService = inject(MoviesService);
  readonly dialog = inject(MatDialog);

  showClearButton = signal(false);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.loadMovies('');
  }

  loadMovies(filter: string): void {
    if (filter.length > 0) {
      this.showClearButton.set(true);
    } else {
      this.showClearButton.set(false);
    }
    this.moviesService.setFilter(filter);
    this.moviesService.loadMoviesByFilter$().pipe(
      takeUntil(this.destroy$),
    ).subscribe();
  }

  onInputChange(val: string): void {
    this.loadMovies(val);
  }

  showMovieDetails(movie: Movie): void {
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

  clearInput(): void {
    this.filterValue = '';
    this.loadMovies('');
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
