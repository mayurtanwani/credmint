import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './data.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartItems.asObservable();

  constructor() {
    this.cart$.subscribe(items => {
      localStorage.setItem('cart_items', JSON.stringify(items));
    });
  }

  private loadCart(): CartItem[] {
    const data = localStorage.getItem('cart_items');
    return data ? JSON.parse(data) : [];
  }

  addToCart(product: Product, quantity: number = 1) {
    const items = this.cartItems.getValue();
    const existing = items.find(i => i.product.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    
    this.cartItems.next([...items]);
  }

  removeFromCart(productId: string) {
    const items = this.cartItems.getValue().filter(i => i.product.id !== productId);
    this.cartItems.next(items);
  }

  updateQuantity(productId: string, quantity: number) {
    const items = this.cartItems.getValue();
    const existing = items.find(i => i.product.id === productId);
    
    if (existing) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        existing.quantity = quantity;
        this.cartItems.next([...items]);
      }
    }
  }

  getCartCount(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + (item.product.numericPrice * item.quantity), 0);
  }
}
