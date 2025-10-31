import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-movie-details',
  imports: [MatIconModule, CommonModule ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  animations: [
    trigger('flip', [
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front <=> back', [
        animate('600ms ease-in-out')
      ])
    ])
  ]
})
export class MovieDetails{
  isFrontCover = signal(true);

  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MovieDetails>);
  readonly moviesService = this.data.mservice;

  readonly selectedMovie = this.moviesService.selectedMovieS();

  toggleCover(): void {
    this.isFrontCover.update((isCover: boolean) => !isCover);
  }

  closeDialog(): void {
    this.moviesService.setSelectedMovie(null);
    this.dialogRef.close();
  }
}
