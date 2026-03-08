import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.scss'
})
export class AppFooter {
  currentYear = new Date().getFullYear();
}
