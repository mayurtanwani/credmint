import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-card',
  imports: [CommonModule],
  templateUrl: './promo-card.html',
  styleUrl: './promo-card.scss',
})
export class PromoCard {
  /** Small label shown above the title (e.g. "Asus", "Big deal") */
  @Input() category = '';
  /** Main bold title */
  @Input() title = '';
  /** Optional secondary line */
  @Input() subtitle = '';
  /** If set, renders a CTA button */
  @Input() buttonText = '';
  /** 'primary' (green) | 'outline' */
  @Input() buttonVariant: 'primary' | 'outline' = 'primary';
  /** 'start' | 'center' | 'end' alignment */
  @Input() layout: 'start' | 'center' | 'end' = 'start';
}
