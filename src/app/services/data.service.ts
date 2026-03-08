import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, catchError, of } from 'rxjs';

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  categoryId: string;
  subCategory?: string;
  badgeText: string;
  badgeType: 'new' | 'favorite' | 'discount' | 'sold-out' | 'none';
  title: string;
  price: string;
  numericPrice: number;
  originalPrice: string;
  vendor: string;
  imageUrl: string;
  imageRatio: '1:1' | '3:2';
}

export interface AppData {
  categories: Category[];
  products: Product[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  
  private dataSubject = new BehaviorSubject<AppData | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor() {
    this.loadData();
  }

  private loadData() {
    this.http.get<AppData>('/data.json').subscribe({
      next: data => {
        if (data) {
          console.log(`DEBUG: Data loaded successfully. Categories: ${data.categories?.length}, Products: ${data.products?.length}`);
          this.dataSubject.next(data);
        } else {
          console.warn('DEBUG: Data loaded but is null or empty');
        }
      },
      error: err => {
        console.error('DEBUG: Data loading failed!', err);
      }
    });
  }

  searchProducts(query: string, categoryId: string = 'all'): Observable<Product[]> {
    return this.data$.pipe(
      map(data => {
        if (!data) return [];
        let filtered = data.products;
        
        if (categoryId && categoryId !== 'all') {
          filtered = filtered.filter(p => p.categoryId === categoryId);
        }
        
        if (query) {
          const lowerQuery = query.toLowerCase();
          filtered = filtered.filter(p => p.title.toLowerCase().includes(lowerQuery));
        }
        
        return filtered;
      })
    );
  }

  getCategories(): Observable<Category[]> {
    return this.data$.pipe(
      map(data => data ? data.categories : [])
    );
  }
}
