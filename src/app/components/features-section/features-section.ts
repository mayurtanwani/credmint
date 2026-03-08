import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-section',
  imports: [CommonModule, MatIconModule],
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss'
})
export class FeaturesSection {
  @Input() items: FeatureItem[] = [
    {
      icon: 'local_shipping', // Closest material icon for truck
      title: 'Free Shipping',
      description: 'For invoices<br>over $1.500'
    },
    {
      icon: 'sync_alt', // Cash back / refund icon approx
      title: 'Cash Back',
      description: 'When paying for products<br>via Dasun Wallet'
    },
    {
      icon: 'headset_mic', // Headset for 24/7 support
      title: '24/7 Support',
      description: 'When something goes<br>wrong'
    }
  ];
}
