import { Component, input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-safe-img',
  imports: [],
  templateUrl: './safe-img.html',
  styleUrl: './safe-img.scss',
  standalone: true
})
export class SafeImgComponent implements OnInit{
  src = input.required<string>();
  alt = input('Image');
  fallback = input('/assets/images/defaultMovie.webp');
  cssClass = input('');
  width = input('100%');
  height = input('100%');
  
  currentSrc = signal('');

  ngOnInit(): void {
      this.currentSrc.set(this.src());
  }

  onLoad() {
    console.log('Image loaded successfully:', this.currentSrc());
  }

  onError() {
    console.log('Image load error, using fallback');
    this.currentSrc.set(this.fallback());
  }
}
