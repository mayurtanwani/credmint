import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService, Product } from '../../services/data.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  
  query = '';
  categoryId = 'all';
  products: Product[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.categoryId = params['category'] || 'all';
      
      this.dataService.searchProducts(this.query, this.categoryId).subscribe(results => {
        this.products = results;
      });
    });
  }
}
