import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-promo-product-card',
  imports: [CommonModule],
  templateUrl: './promo-product-card.html',
  styleUrl: './promo-product-card.scss'
})
export class PromoProductCard {
  @Input() badgeText = '';
  @Input() title = '';
  @Input() price = '';
  @Input() originalPrice = '';
  @Input() soldCount = 0;
  @Input() inStockCount = 0;
  @Input() days = '00';
  @Input() hours = '00';
  @Input() minutes = '00';
  @Input() seconds = '00';

  get progressPercentage(): number {
    const total = this.soldCount + this.inStockCount;
    if (total === 0) return 0;
    return (this.soldCount / total) * 100;
  }

  private cartService = inject(CartService);

  addToCart() {
    this.cartService.addToCart({
      id: Math.random().toString(), // fake ID since hardcoded
      categoryId: 'technology',
      badgeText: this.badgeText,
      badgeType: 'discount',
      title: this.title,
      price: this.price,
      numericPrice: parseFloat(this.price.replace(/[^0-9.-]+/g,"")),
      originalPrice: this.originalPrice,
      vendor: 'Promo Vendor',
      imageUrl: '',
      imageRatio: '1:1'
    });
    alert('Promo Product added to cart!');
  }
}
