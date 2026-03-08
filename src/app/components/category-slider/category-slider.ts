import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductCard, BadgeType } from '../product-card/product-card';
import { DataService, Product } from '../../services/data.service';

export interface CategoryCard {
  id: string;
  label: string;
  icon: string;
  subLabel?: string;
  active?: boolean;
}

@Component({
  selector: 'app-category-slider',
  imports: [CommonModule, MatIconModule, MatButtonModule, ProductCard],
  templateUrl: './category-slider.html',
  styleUrl: './category-slider.scss'
})
export class CategorySlider implements OnInit {
  private dataService = inject(DataService);

  categories: CategoryCard[] = [
    { id: 'real-estate', label: 'Real Estate', icon: 'home' },
    { id: 'technology', label: 'Technology', icon: 'devices', active: true },
    { id: 'watch', label: 'Watch', icon: 'watch' },
    { id: 'glasses', label: 'Glasses', icon: 'visibility' },
    { id: 'cosmetics', label: 'Cosmetic', icon: 'face' },
    { id: 'luxury-food', label: 'Food', subLabel: 'High Grade', icon: 'restaurant_menu' },
  ];

  products = signal<Product[]>([]);

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.updateProducts();
      }
    });
  }

  private updateProducts() {
    const activeCat = this.categories.find(c => c.active);
    if (!activeCat) return;

    this.dataService.data$.subscribe(data => {
      if (!data) return;
      const filtered = data.products.filter(p => p.categoryId === activeCat.id);
      this.products.set(filtered);
    });
  }

  selectCategory(selected: CategoryCard) {
    this.categories.forEach(cat => cat.active = false);
    selected.active = true;
    this.updateProducts();
  }

  scrollLeft(trackData: HTMLElement) {
    trackData.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(trackData: HTMLElement) {
    trackData.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
