import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import 'intersection-observer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Note the plural 'styleUrls'
})
export class AppComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    this.hiddenElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      elements.forEach((element) =>
        this.observer.observe(element.nativeElement)
      );
    });
    this.hiddenElements.forEach((element) =>
      this.observer.observe(element.nativeElement)
    );
  }
}
