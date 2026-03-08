import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/data.service';
import { CartService } from '../../services/cart.service';

export type BadgeType = 'new' | 'favorite' | 'discount' | 'sold-out' | 'none';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() badgeText = '';
  @Input() badgeType: BadgeType = 'none';
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() price = '';
  @Input() originalPrice = '';
  @Input() vendor = '';
  @Input() imageRatio: '1:1' | '3:2' = '1:1';
  @Input() product?: Product;

  private cartService = inject(CartService);

  addToCart(event: Event) {
    event.stopPropagation();
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Product added to cart!');
    } else {
      console.warn('Cannot add to cart: Product object is missing!');
    }
  }
}
