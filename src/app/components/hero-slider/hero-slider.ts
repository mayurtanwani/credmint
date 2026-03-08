import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero-slider',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './hero-slider.html',
  styleUrl: './hero-slider.scss'
})
export class HeroSlider {
  slides = [
    { category: 'New Product', title: 'HAND WATCH', subtitle: 'ROSSINI', buttonText: 'Buy Now' },
    { category: 'Special Offer', title: 'GAMING PC', subtitle: 'EXTREME', buttonText: 'Shop Now' },
    { category: 'Clearance', title: 'HOME AUDIO', subtitle: 'WIRELESS', buttonText: 'Buy Now' }
  ];
  currentSlide = 0;

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}
