import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../services/data.service';
import { CartService } from '../../services/cart.service';

export type ProductBadgeType = 'new' | 'favorite' | 'discount' | 'sold-out' | 'none';

@Component({
  selector: 'app-horizontal-product-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './horizontal-product-card.html',
  styleUrl: './horizontal-product-card.scss'
})
export class HorizontalProductCard {
  @Input() badgeText = '';
  @Input() badgeType: ProductBadgeType = 'none';
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() price = '';
  @Input() originalPrice = '';
  @Input() vendor = '';
  @Input() product?: Product;

  private cartService = inject(CartService);

  addToCart(event: Event) {
    event.stopPropagation();
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Product added to cart!');
    } else {
      console.warn('Cannot add to cart: Product object missing in HorizontalProductCard!');
    }
  }
}
