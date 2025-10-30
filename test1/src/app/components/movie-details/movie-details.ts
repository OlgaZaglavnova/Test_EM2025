import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-movie-details',
  imports: [MatIconModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
})
export class MovieDetails{
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<MovieDetails>);
  readonly moviesService = this.data.mservice;

  readonly selectedMovie = this.moviesService.selectedMovieS();

  closeDialog(): void {
    this.moviesService.setSelectedMovie(null);
    this.dialogRef.close();
  }
}
