import { Component, inject, OnInit, signal } from '@angular/core';
import { PromoCard } from '../promo-card/promo-card';
import { HeroSlider as HeroSliderComponent } from '../hero-slider/hero-slider';
import { CategorySlider } from '../category-slider/category-slider';
import { PromoProductSlider } from '../promo-product-slider/promo-product-slider';
import { TechnologySection } from '../technology-section/technology-section';
import { ProductSliderSection } from '../product-slider-section/product-slider-section';
import { FeaturesSection } from '../features-section/features-section';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-hero-section',
  imports: [PromoCard, HeroSliderComponent, CategorySlider, PromoProductSlider, TechnologySection, ProductSliderSection, FeaturesSection],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss'
})
export class HeroSection implements OnInit {
  private dataService = inject(DataService);

  watchProducts = signal<Product[]>([]);
  cosmeticsProducts = signal<Product[]>([]);
  realEstateProducts = signal<Product[]>([]);
  luxuryFoodProducts = signal<Product[]>([]);

  watchCategories = ['All', 'Smart watch', 'Men\'s watch', 'Women\'s Watches'];
  cosmeticsCategories = ['All', 'Lotion', 'Mask', 'Perfume'];
  realEstateCategories = ['All', 'House for rent', 'Land', 'Project'];
  luxuryFoodCategories = ['All', 'Drinks', 'Cereals', 'Resources'];

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (!data) {
        console.warn('DEBUG: HeroSection received null data');
        return;
      }
      
      this.watchProducts.set(data.products.filter(p => p.categoryId === 'watch'));
      this.cosmeticsProducts.set(data.products.filter(p => p.categoryId === 'cosmetics'));
      this.realEstateProducts.set(data.products.filter(p => p.categoryId === 'real-estate'));
      this.luxuryFoodProducts.set(data.products.filter(p => p.categoryId === 'luxury-food'));
      
      console.log('DEBUG: HeroSection data updated. Watch count:', this.watchProducts().length);
    });
  }
}

