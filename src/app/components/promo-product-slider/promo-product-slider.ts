import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PromoProductCard } from '../promo-product-card/promo-product-card';

@Component({
  selector: 'app-promo-product-slider',
  imports: [CommonModule, MatIconModule, MatButtonModule, PromoProductCard],
  templateUrl: './promo-product-slider.html',
  styleUrl: './promo-product-slider.scss'
})
export class PromoProductSlider {
  promoProducts = [
    {
      badgeText: '- 15%',
      title: 'Apple Macbook Air MWTJ2SA/A Space Grey (2020)',
      price: '$1,099',
      originalPrice: '$1183.71',
      soldCount: 700,
      inStockCount: 300,
      days: '123',
      hours: '42',
      minutes: '00',
      seconds: '08'
    },
    {
      badgeText: '- 12%',
      title: 'Apple Watch Series 5 MWV62VN/A',
      price: '$514.51',
      originalPrice: '$539.06',
      soldCount: 700,
      inStockCount: 300,
      days: '123',
      hours: '42',
      minutes: '00',
      seconds: '08'
    }
  ];

  scrollLeft(trackData: HTMLElement) {
    trackData.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollRight(trackData: HTMLElement) {
    trackData.scrollBy({ left: 400, behavior: 'smooth' });
  }
}
