import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { AppFooter } from '../components/app-footer/app-footer';

export interface NavLink { label: string; href: string; }
export interface Category { label: string; value: string; }

@Component({
  selector: 'app-top-bar',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    AppFooter
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar implements OnInit {
  private router = inject(Router);
  private cartService = inject(CartService);
  private dataService = inject(DataService);

  searchQuery = signal('');
  selectedCategory = signal('all');
  wishlistCount = signal(0);
  cartCount = signal(0);
  cartItems = signal<CartItem[]>([]);
  cartTotal = signal(0);

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems.set(items);
      this.cartCount.set(this.cartService.getCartCount());
      this.cartTotal.set(this.cartService.getCartTotal());
    });
    this.dataService.getCategories().subscribe(cats => {
      console.log('DEBUG: TopBar categories subscription pulse:', cats?.length);
      const mapped = cats.map(c => ({ label: c.name, value: c.id }));
      if (!mapped.find(m => m.value === 'all')) {
        mapped.unshift({ label: 'All Categories', value: 'all' });
      }
      this.categories.set(mapped);
    });
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  onSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchQuery(),
        category: this.selectedCategory()
      }
    });

    if (this.mobileSearchOpen) {
      this.mobileSearchOpen = false;
    }
  }

  // Plain booleans — mat-sidenav [(opened)] requires a non-signal writable property
  mobileMenuOpen = false;
  mobileSearchOpen = false;

  readonly navLinks: NavLink[] = [
    { label: 'Introduce', href: '#' },
    { label: 'Partner incentives', href: '#' },
    { label: 'Promotion', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Frequently asked questions', href: '#' },
  ];

  readonly socialLinks = [
    { icon: 'facebook', materialIcon: 'facebook', href: '#', ariaLabel: 'Facebook' },
    { icon: 'instagram', materialIcon: 'photo_camera', href: '#', ariaLabel: 'Instagram' },
    { icon: 'twitter', materialIcon: 'close', href: '#', ariaLabel: 'Twitter / X' },
    { icon: 'mail', materialIcon: 'mail', href: '#', ariaLabel: 'Email' },
  ];

  categories = signal<Category[]>([
    { label: 'All Categories', value: 'all' }
  ]);

  readonly secondaryNavLinks = [
    { label: 'Home', href: '#', badge: null as string | null, hasDropdown: false },
    { label: 'New Product', href: '#', badge: null as string | null, hasDropdown: true },
    { label: 'Promotion', href: '#', badge: 'HOT' as string | null, hasDropdown: false },
  ];

  readonly rightActions = [
    { label: 'Track Your Order', icon: 'local_shipping', href: '#' },
    { label: 'Sign In/Register', icon: 'person_outline', href: '#' },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) this.mobileSearchOpen = false;
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
    if (this.mobileSearchOpen) this.mobileMenuOpen = false;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

}
