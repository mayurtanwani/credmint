import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {
  cartService = inject(CartService);
  
  cartItems$ = this.cartService.cart$;
  
  get total() {
    return this.cartService.getCartTotal();
  }

  updateQuantity(item: CartItem, change: number) {
    this.cartService.updateQuantity(item.product.id, item.quantity + change);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    alert('Checkout feature coming soon!');
  }
}
