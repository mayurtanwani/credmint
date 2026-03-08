import { Component, signal } from '@angular/core';
import { TopBar } from './top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [TopBar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('credmint');
}
