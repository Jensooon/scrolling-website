import { Component } from '@angular/core';
import 'intersection-observer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Note the plural 'styleUrls'
})
export class AppComponent {
  title = 'scrolling-website';
}
