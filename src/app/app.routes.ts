import { Routes } from '@angular/router';
import { HeroSection } from './components/hero-section/hero-section';
import { SearchPage } from './components/search-page/search-page';
import { CartPage } from './components/cart-page/cart-page';

export const routes: Routes = [
  { path: '', component: HeroSection },
  { path: 'search', component: SearchPage },
  { path: 'cart', component: CartPage }
];
