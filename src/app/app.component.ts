import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'scrolling-website';

  @ViewChildren('hiddenElement') hiddenElements!: QueryList<ElementRef>;

  observer: IntersectionObserver;

  constructor(private renderer: Renderer2) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
        } else {
          this.renderer.removeClass(entry.target, 'visible');
        }
      });
    });
  }

  ngOnInit() {
    this.hiddenElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      elements.forEach((element) =>
        this.observer.observe(element.nativeElement)
      );
    });
  }
}
