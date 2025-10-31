import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { MoviesService } from '../../services/movies.service';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieDetails } from '../movie-details/movie-details';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [FormsModule, ReactiveFormsModule, MovieCard, MovieDetails, MatProgressSpinnerModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit, OnDestroy {
  filterControl = new FormControl('');
  
  moviesService = inject(MoviesService);
  readonly dialog = inject(MatDialog);

  showClearButton = signal(false);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(
      tap(() => {
        this.moviesService.setLoading(true);
      }),
      takeUntil(this.destroy$),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(value => {
        this.loadMovies(value ?? '');
      })
    ).subscribe();
    this.filterControl.setValue('');// вызовем загрузку - изменим значение
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
    this.filterControl.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
