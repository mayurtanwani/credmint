import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HorizontalProductCard } from '../horizontal-product-card/horizontal-product-card';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-technology-section',
  imports: [CommonModule, MatIconModule, MatButtonModule, HorizontalProductCard],
  templateUrl: './technology-section.html',
  styleUrl: './technology-section.scss'
})
export class TechnologySection implements OnInit {
  categories = ['All', 'Smart Watch', 'Laptop', 'Tablet', 'Desktop', 'Accessories'];
  activeCategory = 'All';

  private dataService = inject(DataService);

  techProducts = signal<Product[]>([]);

  ngOnInit() {
    this.dataService.data$.subscribe((data: any) => {
      if (!data) return;
      const filtered = data.products.filter((p: Product) => p.categoryId === 'technology');
      console.log('DEBUG: TechnologySection products filtered:', filtered.length);
      this.techProducts.set(filtered);
    });
  }

  selectCategory(cat: string, event: Event) {
    event.preventDefault();
    this.activeCategory = cat;
  }
}
