import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { SafeImgComponent } from 'src/app/shared/safe-img/safe-img';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, SafeImgComponent],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input('movie') movieItem: Movie | undefined = undefined;

  defaultMovieCover = '/assets/images/defaultMovie.webp';
}
