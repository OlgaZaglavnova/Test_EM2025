import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../interfaces/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies implements OnInit, OnDestroy {
  private apiService = inject(ApiService);

  moviesList = signal<Movie[]>([]);
  loading = signal<boolean>(false);

  destroy$ = new Subject();

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading.set(true);
    this.apiService.getFilms()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (moviesDTO) => {
        this.moviesList.set(moviesDTO);
        console.log('MOVS: ', moviesDTO)
      },
      error: (err) => {
        console.error('Ошибка загрузки:', err);
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

}
