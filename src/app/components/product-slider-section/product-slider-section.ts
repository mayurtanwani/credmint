import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductCard, BadgeType } from '../product-card/product-card';

import { Product } from '../../services/data.service';

@Component({
  selector: 'app-product-slider-section',
  imports: [CommonModule, MatIconModule, MatButtonModule, ProductCard],
  templateUrl: './product-slider-section.html',
  styleUrl: './product-slider-section.scss'
})
export class ProductSliderSection {
  @Input() sectionTitle = 'Section Title';
  @Input() categories: string[] = ['All'];
  @Input() products: Product[] = [];

  activeCategory = 'All';

  ngOnInit() {
    if (this.categories.length > 0) {
      this.activeCategory = this.categories[0];
    }
  }

  selectCategory(cat: string, event: Event) {
    event.preventDefault();
    this.activeCategory = cat;
  }

  scrollLeft(trackData: HTMLElement) {
    trackData.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(trackData: HTMLElement) {
    trackData.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
